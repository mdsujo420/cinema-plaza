const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Content Fetching Route
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

        // Fetch Anime from Jikan
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

// Stream Link Resolver Route
app.get('/api/stream', async (req, res) => {
    const { type, id, title } = req.query;
    try {
        if (type === 'anime') {
            const searchRes = await axios.get(`https://api.consumet.org/anime/gogoanime/${encodeURIComponent(title)}`);
            if (searchRes.data.results && searchRes.data.results.length > 0) {
                const animeId = searchRes.data.results[0].id;
                const infoRes = await axios.get(`https://api.consumet.org/anime/gogoanime/info/${animeId}`);
                const episodeId = infoRes.data.episodes[0]?.id;
                
                if (episodeId) {
                    const streamRes = await axios.get(`https://api.consumet.org/anime/gogoanime/watch/${episodeId}`);
                    const defaultStream = streamRes.data.sources.find(s => s.quality === 'default') || streamRes.data.sources[0];
                    return res.json({ success: true, streamUrl: defaultStream.url, isHls: true });
                }
            }
        }
        
        const embedUrl = type === 'movie' 
            ? `https://vidsrc.to/embed/movie/${id}`
            : `https://autoembed.cc/embed/player.php?title=${encodeURIComponent(title)}`;

        res.json({ success: true, streamUrl: embedUrl, isHls: false });
    } catch (err) {
        const fallbackUrl = type === 'movie'
            ? `https://vidsrc.me/embed/movie?tmdb=${id}`
            : `https://autoembed.cc/embed/player.php?title=${encodeURIComponent(title)}`;
            
        res.json({ success: true, streamUrl: fallbackUrl, isHls: false });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
