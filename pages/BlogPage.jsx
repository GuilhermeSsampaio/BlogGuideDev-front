import React from "react";
import CtaBox from "../src/components/CtaBox";
import PostCard from "../src/components/PostCard";

export default function BlogPage() {
  return (
    <div>
      <CtaBox />
      <hr />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
