"use client"
import { useSearchParams } from 'next/navigation';
import YoutubePlayer from '../../YoutubePlayer';

export default function page() {
  const params = useSearchParams();
  const videoId = params.get('v');

  return (
    <YoutubePlayer videoId={videoId} />
  )
}
