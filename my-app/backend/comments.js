import express from 'express'
import axios from 'axios'

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const commentsRouter = express.Router();

///////////////////////////////////
// Youtube API
///////////////////////////////////

const API_KEY = process.env.YOUTUBE_API;
const maxResults = 20;

async function retrieveComments(videoId) {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
    params: {
      part: 'snippet',
      videoId: videoId,
      maxResults: maxResults,
      order: 'relevance',
      key: API_KEY,
    },
  });

  const comments = res.data.items.map(item => ({
    text: item.snippet.topLevelComment.snippet.textOriginal,
    author: item.snippet.topLevelComment.snippet.authorDisplayName,
    likes: item.snippet.topLevelComment.snippet.likeCount,
    publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
    updatedAt: item.snippet.topLevelComment.snippet.updatedAt
  }));

  return comments;
};

///////////////////////////////////
// Routes
///////////////////////////////////

commentsRouter.get('/comments/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const comments = await retrieveComments(videoId);
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Network Error. Please try again." });
  }
})