"use client";

import React from "react";
import { VideoDetail } from "../types/type";
import Image from "next/image";

interface PreviewVideoProps {
  videoDetail: VideoDetail;
}

const PreviewVideo = ({ videoDetail }: PreviewVideoProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold">{videoDetail.title}</h1>
      <Image
        src={videoDetail.thumbnails.url}
        alt={videoDetail.title}
        width={720}
        height={1080}
      />
      <div className="flex items-center space-x-2 font-light text-lg">
        <p>Author: {videoDetail.author.name}</p>
      </div>
    </div>
  );
};

export default PreviewVideo;
