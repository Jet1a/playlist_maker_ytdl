import express from 'express'
import { downloadVideo, getVideoInfo } from '../controllers/ytdlController.js'

const router = express.Router()

router.get("/download", downloadVideo)
router.get("/info", getVideoInfo)

export default router