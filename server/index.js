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
const port = 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

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
    origin: FRONTEND_URL,
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

  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/login`,
  }),
  (req, res) => {
    // Redirect back to the frontend. If you want “logged in” state, we will need
    // to persist the session or issue a JWT for the frontend.
    return res.redirect(`${FRONTEND_URL}/?auth=google`);
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