const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/content', async (req, res) => {
    try {
        const tmdbApiKey = process.env.TMDB_API_KEY || '826b580ea81021a504b92880d44cf7d9';
        
        // Fetch Movies from TMDB
        const movieRes = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`);
        const movies = movieRes.data.results.slice(0, 10).map(m => ({
            id: m.id,
            title: m.title,
            poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
            rating: m.vote_average.toFixed(1),
            type: 'movie'
        }));

        // Fetch Anime from Jikan API
        const animeRes = await axios.get('https://api.jikan.moe/v4/top/anime');
        const anime = animeRes.data.data.slice(0, 10).map(a => ({
            id: a.mal_id,
            title: a.title,
            poster: a.images.jpg.large_image_url,
            rating: a.score || 'N/A',
            type: 'anime'
        }));

        res.json({ success: true, data: [...movies, ...anime] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
