"use client"

import YoutubePlayer from '../../YoutubePlayer';
import { Suspense } from "react";
import Load from '../../Load';

export default function page() {
  return (
    <Suspense fallback={<Load />}>
      <YoutubePlayer />
    </Suspense>
  )
}
