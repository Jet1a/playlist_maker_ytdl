import ytdl from "ytdl-core"
import { spawn } from 'child_process';

export const downloadVideo = async (req, res) => {
   const videoUrl = req.query.url
   if (!videoUrl) return res.status(400).send("No URL Provided")

   res.setHeader('Content-Disposition', `attachment; filename="video.mp4"`);

   const ytdlp = spawn('yt-dlp', ['-o', '-', '-f', 'best', videoUrl])

   ytdlp.stdout.pipe(res)

   ytdlp.stderr.on('data', (data) => {
      console.error(`yt-dlp error: ${data}`)
   })

   ytdlp.on('exit', (code) => {
      if (code !== 0) {
         console.error(`yt-dlp exited with code ${code}`)
         res.status(500).send('Failed to download video')
      }
   })
}