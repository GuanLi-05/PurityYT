export default function YoutubePlayer({ videoId }) {
  return (
    <iframe
      className="w-full max-w-[960px] aspect-video rounded-md shadow-lg"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
