import { VideoGrid } from "../../VideoGrid";
import { VideoTable } from "../../VideoTable";
import React from "react";

export default function SearchResults({ videoData }) {
  const [layout, setLayout] = React.useState("grid");

  React.useEffect(() => {
    setLayout(localStorage.getItem("layout") ?? "grid");
  }, [])

  return (
    layout === "grid" ? <VideoGrid videoData={videoData} /> : <VideoTable videoData={videoData} />
  )
}
