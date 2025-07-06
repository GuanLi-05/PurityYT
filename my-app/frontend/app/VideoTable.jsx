'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import React from "react";

export function VideoTable({ videoData }) {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [showHover, setShowHover] = React.useState(false);
  const thumbnail = React.useRef("");

  const updateCoords = (e) => {
    setCoords({ x: e.clientX, y: e.clientY });
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

  const redirect = (video) => {
    localStorage.setItem(video.videoId, JSON.stringify({ description: video.description, title: video.title }));
  };

  console.log(videoData);
  return (
    <>
      {showHover && <HoverThumbnail thumbnail={thumbnail.current} coords={coords} />}
      <Table onMouseMove={updateCoords}>
        <TableCaption><br />End of Results.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Channel</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-center">Views</TableHead>
            <TableHead className="text-center">Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videoData.current.videos.map((video) => (
            <TableRow
              key={video.videoId}
              onMouseEnter={() => {
                setShowHover(true);
                thumbnail.current = video.thumbnail;
              }}
              onMouseLeave={() => setShowHover(false)}
            >
              <TableCell>
                <a href={`/watch?v=${video.videoId}`} onClick={() => redirect(video)} className="block w-full h-full">{video.title}</a>
              </TableCell>
              <TableCell className="text-center">
                <a href={`/watch?v=${video.videoId}`} onClick={() => redirect(video)} className="block w-full h-full">{video.channel}</a>
              </TableCell>
              <TableCell className="text-center">
                <a href={`/watch?v=${video.videoId}`} onClick={() => redirect(video)} className="block w-full h-full">{video.duration}</a>
              </TableCell>
              <TableCell className="text-center">
                <a href={`/watch?v=${video.videoId}`} onClick={() => redirect(video)} className="block w-full h-full">{video.viewCount}</a>
              </TableCell>
              <TableCell className="text-center">
                <a href={`/watch?v=${video.videoId}`} onClick={() => redirect(video)} className="block w-full h-full">{publishedAgo(video.publishedAt)}</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

function HoverThumbnail({ thumbnail, coords }) {
  return (
    <div
      className="fixed top-[]"
      style={{
        top: coords.y,
        left: coords.x,
        transform: "translate(10px, 10px)",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <Image src={thumbnail} alt="thumbnail" width={320} height={180} />
    </div>
  )
}

