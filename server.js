const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_USERNAME = 'jamie666real';

// Server-side cache to avoid GitHub API rate limits (10 minutes)
let cachedRepos = null;
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000;

// Serve static files (index.html, CSS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API route that fetches and caches your GitHub repositories
app.get('/api/repos', async (req, res) => {
  const now = Date.now();

  // Return cached data if it is still fresh
  if (cachedRepos && (now - lastFetchTime < CACHE_DURATION)) {
    return res.json(cachedRepos);
  }

  try {
    const response = await fetch(`https://github.com{GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': `${GITHUB_USERNAME}-portfolio-server`
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const repos = await response.json();
    
    // Update the server cache
    cachedRepos = repos;
    lastFetchTime = now;

    res.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error.message);

    // Serve stale cache if GitHub fails temporarily
    if (cachedRepos) {
      return res.json(cachedRepos);
    }

    res.status(502).json({ error: 'Could not load repositories from GitHub.' });
  }
});

// Catch-all route for 404 errors (serves your custom 404.html)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
