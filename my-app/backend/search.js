import express from "express"
import axios from 'axios';
import he from 'he';
import { parse } from 'iso8601-duration';

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const searchRouter = express.Router();

///////////////////////////////////
// Youtube API
///////////////////////////////////

const API_KEY = process.env.YOUTUBE_API;
const maxResults = 5;

async function searchYoutube(searchQuery) {
  /* Retrieve information from a seach (q) */
  const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults,
      key: API_KEY,
    },
  });

  const videos = res.data.items.filter(item => item.id.videoId).map(item => ({
    title: he.decode(item.snippet.title),
    videoId: item.id.videoId,
    channelId: item.snippet.channelId,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet?.thumbnails?.high.url ?? item.snippet.thumbnails.medium.url,
    publishedAt: item.snippet.publishedAt
  }));

  const videoIds = videos.map(item => item.videoId).join(',');

  /* Retrieve further statistics of a videoId */
  const resStat = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet,statistics,contentDetails',
      id: videoIds,
      key: API_KEY,
    },
  });

  resStat.data.items.forEach((item, i) => {
    videos[i].description = item.snippet.description;

    let view = item.statistics.viewCount;
    if (view >= 1000000000) {
      view = Math.trunc(view / 100000000) / 10 + "b";
    } else if (view >= 1000000) {
      view = Math.trunc(view / 100000) / 10 + "m";
    } else if (view >= 1000) {
      view = Math.trunc(view / 100) / 10 + "k";
    }
    videos[i].viewCount = view;

    const isoTime = parse(item.contentDetails.duration);
    videos[i].duration = `
      ${isoTime.hours ? isoTime.hours.toString() + ":" : ""}
      ${isoTime.minutes ? isoTime.minutes.toString() + ":" : ""}
      ${isoTime.seconds.toString().padStart(2, '0')}`
  });

  return videos;
}

///////////////////////////////////
// Routes
///////////////////////////////////

searchRouter.post('/search', async (req, res) => {
  const { search } = req.body;
  try {
    const videos = await searchYoutube(search);
    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Network Error. Please try again." });
  }
})
