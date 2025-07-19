import ytdl from 'ytdl-core'

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