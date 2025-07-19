"use client";

import { useEffect, useState } from "react";
import { downloadVideo, getVideoInfo } from "../utils/ytdlAction";
import PreviewVideo from "./PreviewVideo";
import { VideoDetail } from "../types/type";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const DownloadInput = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [isInputError, setIsInputError] = useState(false);
  const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      if (!isInputError && videoUrl) {
        setLoading(true);
        const videoInfo = await getVideoInfo(videoUrl);
        setVideoDetail(videoInfo);
        setLoading(false);
      } else {
        setVideoDetail(null);
      }
    };
    fetchVideoInfo();
  }, [isInputError, videoUrl]);

  const isUrlValid = (url: string) => {
    try {
      const parsed = new URL(url);
      const isYouTube = /^(www\.)?(youtube\.com|youtu\.be)$/.test(
        parsed.hostname
      );
      setIsInputError(!isYouTube);
      return isYouTube;
    } catch (error) {
      console.error("Invalid URL", error);
      setIsInputError(true);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    setDisabled(!isUrlValid(e.target.value));
  };

  const handleAddSubmit = (url: string) => {
    setUrls((prev) => [...prev, url]);
    setVideoUrl("");
    toast.success(`Video Submitted`);
  };

  const handleDownloadSubmit = async () => {
    try {
      if (!videoUrl) {
        return null;
      }
      await downloadVideo(videoUrl);
    } catch (error) {
      console.error("Failed to Download", error);
      toast.error("Failed to Download")
    }
  };

  return (
    <>
      <div
        className={`relative border border-neutral-200 rounded-lg flex items-center justify-center ${
          isInputError ? "border-2 border-red-500 bg-red-100" : ""
        }`}
      >
        {isInputError && (
          <div className="absolute text-red-600 font-semibold -bottom-7 left-0">
            Invalid URL
          </div>
        )}
        <input
          type="text"
          placeholder="Paste your youtube url"
          className="px-4 text-lg w-2xl focus:outline-none"
          value={videoUrl}
          onChange={handleInputChange}
        />
        <button
          onClick={() => handleAddSubmit(videoUrl)}
          disabled={disabled}
          className={`p-4 text-white text-lg font-semibold rounded-r-lg transition-all duration-200 ${
            disabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-400 hover:bg-red-500 cursor-pointer"
          }`}
        >
          Submit
        </button>
      </div>

      <p>Total Video Submitted: {urls.length}</p>

      <button
        onClick={handleDownloadSubmit}
        disabled={disabled}
        className={`p-2 text-white text-lg w-xl rounded-xl font-semibold transition-all duration-200 ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-400 hover:bg-green-500 cursor-pointer"
        }`}
      >
        Download
      </button>

      {loading && <Spinner />}
      {!loading && videoDetail && <PreviewVideo videoDetail={videoDetail} />}
    </>
  );
};

export default DownloadInput;
