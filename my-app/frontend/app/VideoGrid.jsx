'use client';
import Image from "next/image";

export function VideoGrid({ videoData }) {
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

  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {videoData.current.videos.map((video) => (
          <div key={video.videoId} className="cursor-pointer" onClick={() => redirect(video)}>
            <a href={`/watch?v=${video.videoId}`} onContextMenu={() => redirect(video)} className="block">
              <div className="relative w-full pb-[56.25%] bg-gray-200 rounded-lg overflow-hidden">
                {!video.allowed ? (
                  <></>
                ) : (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-medium leading-snug line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{video.channel}</p>
                <p className="text-sm text-gray-500">
                  {video.viewCount} views • {publishedAgo(video.publishedAt)}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 py-6">End of Results.</p>
    </div>
  );
}
