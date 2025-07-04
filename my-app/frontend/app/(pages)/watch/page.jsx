"use client"

import React from 'react';
import YoutubePlayer from '../../YoutubePlayer';
import { Suspense } from "react";
import Load from '../../Load';
import Logo from '../../Logo';
import { Profile } from '../../Profile';
import { Button } from '../../../components/ui/button'
import { Loader2Icon } from "lucide-react"

export default function page() {
  const [showComments, setShowComments] = React.useState(false);

  return (
    <>
      <div className="h-auto flex flex-row justify-between items-center sticky top-0 z-10">
        <Logo />
        <div className="mr-[1vw]">
          <Profile className="mr-4" />
        </div>
      </div>

      <div className="flex flex-col items-center px-4 py-6 min-h-[calc(100vh-64px)">
        <Suspense fallback={<Load />}>
          <YoutubePlayer />
        </Suspense>

        <div className="mt-6 max-w-[960px] w-full p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2">Video Title</h2>
          <p className="text-gray-700">
            Video Description
          </p>
        </div>

        <Button variant="ghost" onClick={() => setShowComments((prev) => !prev)}>
          <Loader2Icon className="animate-spin" />
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
