"use client";

import { useState } from "react";
import PageSelector from "@/internal/sections/content/PageSelector/PageSelector";
import MediaUpload from "@/internal/sections/content/MediaUpload/MediaUpload";
import MediaList from "@/internal/sections/content/MediaList/MediaList";

export default function ContentPage() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <PageSelector selected={page} setSelected={setPage} />
      <MediaUpload />
      <MediaList page={page} />
    </div>
  );
}