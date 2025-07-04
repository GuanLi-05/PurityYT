'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";

export function VideoTable({ videoData }) {
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

  const router = useRouter();
  return (
    <Table>
      <TableCaption><br />End of Results.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[700px]">Title</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Published</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {videoData.current.videos.map((video) => (
          <TableRow key={video.videoId}>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)} className="font-medium">{video.title}</TableCell>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)}>{video.channel}</TableCell>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)}>{video.duration}</TableCell>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)} className="text-right">{video.viewCount}</TableCell>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)} className="text-right">{publishedAgo(video.publishedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
