"use client";

import React, { useContext, useEffect, useState } from "react";
import { SubmitUrlContext } from "../context/SubmitUrlContext";
import { getVideoInfo } from "../utils/ytdlAction";
import Spinner from "./Spinner";
import PreviewVideo from "./PreviewVideo";
import { VideoDetail } from "../types/type";

const PreviewSubmitList = () => {
  const urls = useContext(SubmitUrlContext);
  const [previewList, setPreviewList] = useState<VideoDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubmittedVideo = async () => {
      if (urls && urls.length > 0) {
        setLoading(true);
        const videoInfos = await Promise.all(
          urls.map((url) => getVideoInfo(url))
        );
        setPreviewList(videoInfos);
        setLoading(false);
      } else {
        setPreviewList([]);
      }
    };
    fetchSubmittedVideo();
  }, [urls]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <div className="border rounded-md w-2xl mx-auto my-2 p-4">
          <h1 className="font-bold text-2xl mb-4 text-red-500">Submitted List</h1>
          <div className="grid grid-cols-1">
            {previewList.map((video, index) => (
              <div className="" key={index}>
                <PreviewVideo videoDetail={video} list />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewSubmitList;
