export default function SearchResults({ videoData }) {
  return (
    videoData.current.videos.map(video => {
      return (
        <div>
            ///////////////////////
          <p>
            {video.title}
            {video.videoId}
          </p>
            ///////////////////////
        </div>
      )
    })
  )
}
