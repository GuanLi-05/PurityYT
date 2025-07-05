"use client"

import React from 'react';
import YoutubePlayer from '../../YoutubePlayer';
import axios from 'axios';
import { Suspense } from "react";
import Load from '../../Load';
import Logo from '../../Logo';
import { Profile } from '../../Profile';
import { Button } from '../../../components/ui/button'
import { Loader2Icon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
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
  const params = useSearchParams();
  const videoId = params.get('v');

  React.useEffect(() => setData(JSON.parse(sessionStorage.getItem(videoId))), []);

  const handleComments = async () => {
    setShowComments((prev) => !prev);
    if (showComments === true) return;
    try {
      alert("clicked")
      const res = await axios.get(`${URL}/comments/${videoId}`)
      console.log(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  }

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

        <div className="mt-6 max-w-[960px] w-full p-4 rounded-md shadow overflow-hidden relative" style={collapse ? { height: "5.5rem" } : undefined}>
          <h2 className="text-xl font-semibold mb-2">{data.title || "Video Title"}</h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            <Button variant="secondary" size="icon" className="size-8 absolute right-2 top-5.5" onClick={() => setCollapse(prev => !prev)}>
              {collapse ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </Button>
            {data.description || "Video Description"}
          </p>
        </div>

        <Button className="mt-4" variant="ghost" onClick={handleComments}>
          {commentLoad && <Loader2Icon className="animate-spin" />}
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>

        {showComments && (
          <div className="mt-6 max-w-[960px] w-full p-4 rounded-md shadow">
            <p>Comments...</p>
          </div>
        )}
      </div>
    </>
  );
}
