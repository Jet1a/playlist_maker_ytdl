import ytdl from 'ytdl-core'
import fs from 'fs'
import path from 'path'
import archiver from 'archiver'

const DOWNLOAD_DIR = path.resolve('./downloads')

export const downloadVideo = async (req, res) => {
   const videoUrl = req.query.url
   if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).send("Invalid Youtube URL")
   }

   const info = await ytdl.getInfo(videoUrl)

   const title = await info.videoDetails.title.replace(/[^a-z0-9ก-๏]+/gi, '_').toLowerCase()

   const safeTitle = encodeURIComponent(title)

   res.header('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);

   ytdl(videoUrl, {
      format: "mp4",
   }).pipe(res)
}

export const getVideoInfo = async (req, res) => {
   const videoUrl = req.query.url
   if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).send("Invalid Youtube URL")
   }

   const info = await ytdl.getInfo(videoUrl)

   return res.json({
      title: info.videoDetails.title,
      thumbnails: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1],
      author: {
         id: info.videoDetails.author.id,
         name: info.videoDetails.author.name
      }
   })
}

export const downloadMultipleVideos = async (req, res) => {
   const { urls } = req.body

   if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "No URLs provided." })
   }

   // Clean & Recreate download folder
   if (fs.existsSync(DOWNLOAD_DIR)) {
      fs.rmSync(DOWNLOAD_DIR, { recursive: true })
   }
   fs.mkdirSync(DOWNLOAD_DIR)

   try {
      const downloadPromise = urls.map(async (url, index) => {
         if (!ytdl.validateURL(url)) {
            return
         }

         const info = await ytdl.getInfo(videoUrl)
         const title = info.videoDetails.title.replace(/[^a-z0-9ก-๏]+/gi, '_').toLowerCase()

         const filename = `${index + 1}_${title}.mp4`
         const filepath = path.join(DOWNLOAD_DIR, filename)

         return new Promise((resolve, reject) => {
            ytdl(url, { quality: 'lowest' })
               .pipe(fs.createWriteStream(filepath))
               .on('finish', resolve)
               .on('error', reject)
         })
      })

      await Promise.all(downloadPromise)

      // ZIP
      const zipName = 'videos.zip'
      const zipPath = path.join(DOWNLOAD_DIR, zipName)
      const output = fs.createWriteStream(zipPath)
      const archive = archiver('zip', { zlib: { level: 9 } })

      output.on('close', () => {
         res.download(zipPath, zipName, () => {
            fs.rmSync(DOWNLOAD_DIR, { recursive: true })
         })
      })

      archive.on('error', (err) => res.status(500).json({ error: err.message }))

      archive.pipe(output)
      archive.directory(DOWNLOAD_DIR, false)
      archive.finalize()
   } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Failed to process videos." })
   }
}