"use client"

import React from 'react';
import YoutubePlayer from '../../YoutubePlayer';
import axios from 'axios';
import { Suspense } from "react";
import Load from '../../Load';
import Logo from '../../Logo';
import { Profile } from '../../Profile';
import { Button } from '../../../components/ui/button'
import { Loader2Icon, ChevronDownIcon, ChevronUpIcon, ThumbsUpIcon } from "lucide-react"
import { useSearchParams } from 'next/navigation';

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function suspenseWrapper() {
  return (
    <Suspense fallback={<Load />}>
      <Watch />
    </Suspense>
  )
}

function Watch() {
  const [showComments, setShowComments] = React.useState(false);
  const [collapse, setCollapse] = React.useState(true);
  const [data, setData] = React.useState({});
  const [commentLoad, setCommentLoad] = React.useState(false);
  const commentData = React.useRef(null);
  const params = useSearchParams();
  const videoId = params.get('v');

  /* Video Title and Description are initally saved using local storage to persist across tabs. 
   * If currently stored locally, parse information and switch to session storage 
   */
  React.useEffect(() => {
    let retrieve = localStorage.getItem(videoId);
    if (retrieve) {
      localStorage.removeItem(videoId);
      sessionStorage.setItem(videoId, retrieve);
      retrieve = JSON.parse(retrieve);
    } else {
      retrieve = JSON.parse(sessionStorage.getItem(videoId));
    }

    if (retrieve) {
      setData(retrieve);
    } else {
      setData({ title: "Video Title", description: "Video Description" })
    }
  }, []);

  const handleComments = async () => {
    if (showComments === true) {
      setShowComments(false);
      return;
    }
    if (commentData.current) {
      setShowComments(prev => !prev);
      return;
    }
    try {
      setCommentLoad(true);
      const res = await axios.get(`${URL}/comments/${videoId}`)
      commentData.current = res.data.comments;
      console.log(commentData.current);
      setCommentLoad(false);
      setShowComments(true);
    } catch (error) {
      console.log(error);
    }
  }

  const publishedAgo = (date) => {
    const now = new Date();
    const published = new Date(date);
    const diffMs = now - published;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years !== 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months !== 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    if (seconds > 0) return `${seconds}s ago`;
    return "just now";
  };

  return (
    <>
      <div className="h-auto flex flex-row justify-between items-center sticky top-0 z-10">
        <Logo />
        <div className="mr-[1vw]">
          <Profile className="mr-4" />
        </div>
      </div>

      <div className="flex flex-col items-center px-4 py-6 min-h-[calc(100vh-64px)">
        <YoutubePlayer videoId={videoId} />

        <div className="mt-6 max-w-[960px] w-full p-4 rounded-md shadow overflow-hidden relative" style={collapse ? { height: "5.15rem" } : undefined}>
          <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
          <p className="text-gray-500 whitespace-pre-wrap">
            <Button variant="secondary" size="icon" className="size-8 absolute right-2 top-5.5" onClick={() => setCollapse(prev => !prev)}>
              {!collapse ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </Button>
            {data.description}
          </p>
        </div>

        <Button className="mt-4" variant="ghost" onClick={handleComments}>
          {commentLoad && <Loader2Icon className="animate-spin" />}
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>

        {showComments && (
          <div className="mt-6 max-w-[960px] w-full p-4 rounded-md shadow space-y-6 bg-white text-gray-800 dark:bg-zinc-900 dark:text-gray-100">
            {commentData.current.map((comment, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 border-gray-300 dark:border-zinc-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <div className="font-semibold">{comment.author}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {publishedAgo(comment.publishedAt)}
                  </div>
                </div>
                <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
                <div className="flex items-center mt-2 text-sm gap-4 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <ThumbsUpIcon className="inline w-4 h-4" />
                    <span>{comment.likes}</span>
                  </div>
                  {comment.updatedAt !== comment.publishedAt && (
                    <span className="italic">edited</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div >
    </>
  );
}
