const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} request for ${req.url}`);
    next();
});

// --- API Routes (Example placeholder) ---
// For a fully functional Supabase setup, you typically don't need Express API endpoints
// for Authentication and Forum Posts, as the Supabase client handles them directly.
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'Server is running', 
        message: 'Supabase should be used for Auth and DB operations.',
        env_check: !!process.env.SUPABASE_URL
    });
});

// --- Static File Server ---

// Set the root directory for serving static assets.
// ASSUMPTION: Your HTML, JS, and CSS files are in a directory named 'public'
// You should move all your 15 files into a folder named 'public'.
const publicPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Handle navigation for single-page application (SPA) style, 
// which is useful for direct URL access without a file extension.
// Since you have multiple HTML files, we'll rely on the static server for now.

// Fallback for 404 - could redirect to a custom 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicPath, '404.html')); 
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Supabase URL: ${process.env.SUPABASE_URL ? 'Loaded' : 'NOT LOADED. Check your .env file!'}`);
});