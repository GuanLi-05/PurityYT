import { useSearchParams } from 'next/navigation';

export default function YoutubePlayer({ }) {
  const params = useSearchParams();
  const videoId = params.get('v');

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
