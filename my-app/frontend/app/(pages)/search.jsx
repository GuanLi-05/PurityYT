import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Search() {
  const [input, setInput] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(input);
    try {
      const res = await axios.post(`${URL}/search`, {
        search: input
      });
      console.log(res);
      alert(res);
    } catch (error) {
      alert(error)
      // show alert page
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search"
          name="searchInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
      {/*  <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/gobblygookid"
        frameborder="0"
        allowfullscreen
      ></iframe> */}
    </>

  )

}

