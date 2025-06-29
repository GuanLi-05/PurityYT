import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import axios from axios;

const URL = process.env.BACKEND_URL;

export default function Search() {
  const [input, setInput] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(input);
    axios.post(`${URL}/search`, {
      search: input
    })
  }

  return (
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
  )

}

