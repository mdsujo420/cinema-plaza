const express = require('express');
const cors = require('cors');
const axios = require('axios');
const schedule = require('node-schedule');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

let contentData = [];
let lastUpdated = null;

async function fetchTMDBMovies() {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`);
        return response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            type: 'movie',
            rating: movie.vote_average,
            description: movie.overview,
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            releaseDate: movie.release_date
        }));
    } catch (error) {
        console.error('Error fetching TMDB:', error.message);
        return [];
    }
}

async function fetchJikanAnime() {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        return response.data.data.slice(0, 20).map(anime => ({
            id: anime.mal_id,
            title: anime.title,
            type: 'anime',
            rating: anime.score || 0,
            description: anime.synopsis,
            poster: anime.images?.jpg?.image_url || null,
            episodes: anime.episodes
        }));
    } catch (error) {
        console.error('Error fetching Anime:', error.message);
        return [];
    }
}

async function updateAllContent() {
    console.log('🔄 Fetching latest content...');
    const movies = await fetchTMDBMovies();
    const animes = await fetchJikanAnime();
    contentData = [...movies, ...animes];
    lastUpdated = new Date();
    console.log(`✅ Update complete! Loaded ${contentData.length} items.`);
}

updateAllContent();
schedule.scheduleJob('0 */6 * * *', updateAllContent);

app.get('/api/content', (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const type = req.query.type;
    let result = contentData;
    if (type) result = result.filter(item => item.type === type);
    res.json({ success: true, count: result.length, data: result.slice(0, limit) });
});

app.post('/api/update', async (req, res) => {
    await updateAllContent();
    res.json({ success: true, message: 'Content updated successfully' });
});

app.get('/api/status', (req, res) => {
    res.json({
        status: 'Online',
        totalContent: contentData.length,
        movies: contentData.filter(c => c.type === 'movie').length,
        animes: contentData.filter(c => c.type === 'anime').length,
        lastUpdated: lastUpdated
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
