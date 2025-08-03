import express from "express"
import axios from 'axios';
import he from 'he';
import { parse } from 'iso8601-duration';
import { filterCall } from "./openai.js";

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const searchRouter = express.Router();

///////////////////////////////////
// Youtube API
///////////////////////////////////

const API_KEY = process.env.YOUTUBE_API;

async function searchYoutube(searchQuery, maxResults) {
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
    videos[i].description = he.decode(item.snippet.description);

    let view = item.statistics.viewCount;
    if (view >= 1000000000) {
      view = Math.trunc(view / 100000000) / 10 + "B";
    } else if (view >= 1000000) {
      view = Math.trunc(view / 100000) / 10 + "M";
    } else if (view >= 1000) {
      view = Math.trunc(view / 100) / 10 + "K";
    }
    videos[i].viewCount = view;

    const isoTime = parse(item.contentDetails.duration);
    videos[i].duration = `
      ${isoTime.hours ? isoTime.hours.toString() + "h" : ""}
      ${isoTime.minutes ? (isoTime.hours ? (isoTime.minutes.toString().padStart(2, '0')) : (isoTime.minutes.toString())) + "m" : ""}
      ${isoTime.seconds.toString().padStart(2, '0') + "s"}
    `
    videos[i].channelId = item.snippet.channelId;
    videos[i].channel = item.snippet.channelTitle;
    videos[i].thumbnail = item.snippet.thumbnails.medium.url;
    videos[i].publishedAt = item.snippet.publishedAt;
    videos[i].allowed = true;
  });

  const formattedString = videos.map((item, i) => `${i}. ${item.title}`).join('\n');
  const resTest = await filterCall(formattedString);
  console.log(resTest.filter);
  resTest.filter.forEach(item => {
    videos[item.listIndex].allowed = false;
  })

  return videos;
}

///////////////////////////////////
// Routes
///////////////////////////////////

searchRouter.post('/search', async (req, res) => {
  const { search, maxResults } = req.body;
  try {
    const videos = await searchYoutube(search, maxResults);
    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Network Error. Please try again." });
  }
})
