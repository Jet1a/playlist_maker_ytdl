import express from 'express'
import { downloadMultipleVideos, downloadVideo, getVideoInfo } from '../controllers/ytdlController.js'

const router = express.Router()

router.get("/download", downloadVideo)
router.get("/info", getVideoInfo)
router.post("/download-multiple", downloadMultipleVideos)

export default router