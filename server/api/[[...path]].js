// Vercel catch-all route: forwards all requests to your Express app.
// Vercel will call this function with (req, res). Express is compatible with that signature.
const app = require('../index')

module.exports = (req, res) => app(req, res)

