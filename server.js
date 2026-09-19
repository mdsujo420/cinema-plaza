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
        
        // Fetch Movies
        const movieRes = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`);
        const movies = movieRes.data.results.slice(0, 10).map(m => ({
            id: m.id,
            title: m.title,
            poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
            rating: m.vote_average ? m.vote_average.toFixed(1) : 'N/A',
            type: 'movie'
        }));

        // Fetch Anime using TMDB Animation Keyword search
        const animeRes = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&with_genres=16&with_original_language=ja&sort_by=popularity.desc`);
        const anime = animeRes.data.results.slice(0, 10).map(a => ({
            id: a.id,
            title: a.name,
            poster: a.poster_path ? `https://image.tmdb.org/t/p/w500${a.poster_path}` : '',
            rating: a.vote_average ? a.vote_average.toFixed(1) : 'N/A',
            type: 'anime'
        }));

        res.json({ success: true, data: [...movies, ...anime] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
