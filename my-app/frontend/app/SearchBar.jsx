import React from "react"
import axios from "axios";
import { Search } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SearchBar({ videoData, setShowSearch, setErrorShow, setLoading }) {
  const [input, setInput] = React.useState("");
  const { theme } = useTheme()
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    const vId = extractYouTubeVideoId(input);
    if (vId) {
      router.push(`/watch?v=${vId}`)
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/search`, {
        search: input,
        maxResults: 50
      });
      videoData.current = res.data;
      setShowSearch(true);
      router.push(`/dashboard?search=${encodeURIComponent(input)}`);
      console.log("storing in local storage with key: " + encodeURIComponent(input));
      sessionStorage.setItem(encodeURIComponent(input), JSON.stringify(res.data));
    } catch (error) {
      setErrorShow(true);
    } finally {
      setLoading(false);
    }
  }

  function extractYouTubeVideoId(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

    const match = url.match(regex)
    return match ? match[1] : null
  }

  // URL parse is still WIP
  return (
    theme === "dark" ? (
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="flex overflow-hidden rounded-md bg-[#272729]">
          <input
            type="text"
            placeholder="Search or Enter URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow rounded-l-md rounded-r-none border-none bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
            aria-label="Search input"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-r-md rounded-l-none border-none bg-transparent px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    ) : (
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex overflow-hidden rounded-md bg-[#f0f0f0] border border-gray-300">
          <input
            type="text"
            placeholder="Search or Enter URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow rounded-l-md rounded-r-none border-none bg-transparent px-4 py-2 text-black placeholder-gray-500 focus:outline-none"
            aria-label="Search input"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-r-md rounded-l-none border-none bg-transparent px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    )
  )
}

