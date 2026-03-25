const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const session = require('express-session');
const connectPgSimple = require('connect-pg-simple');
const PgSession = connectPgSimple(session);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const port = 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const FRONTEND_URLS = (process.env.FRONTEND_URLS || FRONTEND_URL)
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

function getServerBaseUrl(req) {
  const forwardedProto = req.headers['x-forwarded-proto'];
  const forwardedHost = req.headers['x-forwarded-host'];
  const protoRaw = (Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto || req.protocol || 'http')
    .toString()
    .split(',')[0]
    .trim();
  const proto = process.env.NODE_ENV === 'production' ? 'https' : protoRaw;
  const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || req.get('host'))
    .toString()
    .split(',')[0]
    .trim();
  return `${proto}://${host}`;
}

function getGoogleCallbackUrl(req) {
  if (GOOGLE_CALLBACK_URL) {
    return GOOGLE_CALLBACK_URL;
  }

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return `${getServerBaseUrl(req)}/auth/google/callback`;
}

function getSafeFrontendOrigin(value) {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    const origin = parsed.origin;
    if (FRONTEND_URLS.includes(origin)) {
      return origin;
    }
    return null;
  } catch {
    return null;
  }
}

function resolveFrontendUrl(req) {
  const requested = getSafeFrontendOrigin(req.query.redirect);
  const stored = getSafeFrontendOrigin(req.session?.oauthRedirectUrl);
  return requested || stored || FRONTEND_URL;
}

if (!DATABASE_URL) {
  console.error('DATABASE_URL is missing. Add it to your .env file.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || FRONTEND_URLS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_session_secret',
    resave: false,
    saveUninitialized: false,
    // Vercel uses serverless functions; use a persistent session store so OAuth/login
    // can work across multiple requests.
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    cookie: {
      // Cookies require `secure: true` when using `SameSite=None`.
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL || `http://localhost:${port}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // For now we just pass the profile through the session.
      // If you want full account creation, we can add Prisma user persistence next.
      const email = profile?.emails?.[0]?.value;
      const user = {
        googleId: profile.id,
        email,
        name: profile.displayName,
      };
      return done(null, user);
    }
  )
);

app.get('/auth/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res
      .status(500)
      .send('Google OAuth not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.');
  }
  const callbackURL = getGoogleCallbackUrl(req);
  if (!callbackURL) {
    return res
      .status(500)
      .send('Google OAuth callback is missing. Set GOOGLE_CALLBACK_URL in production.');
  }

  const requestedOrigin = getSafeFrontendOrigin(req.query.redirect);
  req.session.oauthRedirectUrl = requestedOrigin || FRONTEND_URL;

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    callbackURL,
  })(req, res, next);
});

app.get(
  '/auth/google/callback',
  (req, res, next) => {
    const callbackURL = getGoogleCallbackUrl(req);
    if (!callbackURL) {
      const frontend = resolveFrontendUrl(req);
      return res.redirect(`${frontend}/login`);
    }

    passport.authenticate(
      'google',
      {
        callbackURL,
      },
      (err, user) => {
        const frontend = resolveFrontendUrl(req);
        if (err || !user) {
          return res.redirect(`${frontend}/login`);
        }

        req.logIn(user, (loginError) => {
          if (loginError) {
            return res.redirect(`${frontend}/login`);
          }
          return next();
        });
      }
    )(req, res, next);
  },
  (req, res) => {
    const frontend = resolveFrontendUrl(req);
    return res.redirect(`${frontend}/profile`);
  }
);

app.get('/auth/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      ok: false,
      message: 'Not authenticated',
    });
  }

  return res.json({
    ok: true,
    user: req.user,
  });
});

app.post('/auth/logout', (req, res) => {
  req.logout((logoutError) => {
    if (logoutError) {
      return res.status(500).json({
        ok: false,
        message: 'Failed to log out',
      });
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return res.status(500).json({
          ok: false,
          message: 'Failed to end session',
        });
      }

      res.clearCookie('connect.sid', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });

      return res.json({
        ok: true,
        message: 'Logged out successfully',
      });
    });
  });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/db-check', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS server_time');
    res.json({
      ok: true,
      message: 'Connected to Neon successfully',
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Failed to connect to Neon',
      error: error.message,
    });
  }
});

// Export the app for Vercel (serverless) and only listen locally.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;