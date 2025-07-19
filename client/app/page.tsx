import DownloadInput from "./components/DownloadInput";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto flex flex-col items-center pt-4 gap-4">
      <h1 className="text-4xl font-bold">YT Playlist Maker URL</h1>
      <DownloadInput />
    </main>
  );
}
