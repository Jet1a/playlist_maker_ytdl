const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const downloadVideo = async (url: string) => {
  if (!url) return;

  const downloadUrl = `${SERVER_URL}/api/ytdl/download?url=${encodeURIComponent(
    url
  )}`;

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
