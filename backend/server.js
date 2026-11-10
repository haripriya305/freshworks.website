// Local development server:  npm start   ->  http://localhost:5000
const app = require('./app');
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 FreshWorks running at http://localhost:${PORT}  (API: /api, site: /)`));
});
