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

export function VideoTable({ videoData }) {
  console.log(videoData.current.videos);
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
            <TableCell className="font-medium">{video.title}</TableCell>
            <TableCell>{video.channel}</TableCell>
            <TableCell>{video.duration}</TableCell>
            <TableCell className="text-right">{video.viewCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
