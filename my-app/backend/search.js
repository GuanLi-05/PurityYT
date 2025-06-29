import express from "express"
import axios from 'axios';

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const searchRouter = express.Router();

///////////////////////////////////
// Youtube API
///////////////////////////////////

const API_KEY = process.env.YOUTUBE_API;
const maxResults = 3;

async function searchYoutube(searchQuery) {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults,
      key: API_KEY,
    },
  });

  const videos = response.data.items.map(item => ({
    title: item.snippet.title,
    videoId: item.id.videoId,
  }));

  console.log(videos);
  return videos;
}

///////////////////////////////////
// Routes
///////////////////////////////////

searchRouter.post('/search', async (req, res) => {
  const { search } = req.body;
  console.log(search);
  try {
    const videos = await searchYoutube(search);
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: "Network Error. Please try again." });
  }
})
