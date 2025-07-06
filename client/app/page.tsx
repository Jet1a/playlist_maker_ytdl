'use client'

export default function Home() {
  const downloadVideo = async () => {
    try {
      const videoUrl = "https://youtu.be/JnXCm-cYoJs?si=TKH_1igsBNJKAbZu";
      const downloadUrl = `http://localhost:5000/api/ytdl/download?url=${encodeURIComponent(
        videoUrl
      )}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to Download", error);
    }
  };

  return (
    <main>
      <h1>Playlist Maker from any URL</h1>
      <div className="">
        <button className="px-4 py-2 bg-blue-300 m-4 cursor-pointer" onClick={downloadVideo}>Download Video</button>
      </div>
    </main>
  );
}
