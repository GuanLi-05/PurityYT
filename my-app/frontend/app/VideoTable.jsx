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
  const router = useRouter();
  return (
    <Table>
      <TableCaption>End of Results.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[800px]">Title</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">Views</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {videoData.current.videos.map((video) => (
          <TableRow key={video.videoId}>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)} className="font-medium">{video.title}</TableCell>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)}>{video.channel}</TableCell>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)}>{video.duration}</TableCell>
            <TableCell onClick={() => router.push(`/watch?v=${video.videoId}`)} className="text-right">{video.viewCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
