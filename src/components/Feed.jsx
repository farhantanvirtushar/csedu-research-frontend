import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";

import { getUser } from "../User";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const user = getUser();

  const getPosts = async (setPosts) => {
    const res = await axios.get("/api/v1/pdf/?offset=0&limit=10");

    setPosts(res.data.results);
  };

  useEffect(() => {
    getPosts(setPosts);
  }, []);
  return (
    <div>
      <CreatePost />
      {posts.map((item) => (
        <Post key={item.id} post={item} />
      ))}
    </div>
  );
}
