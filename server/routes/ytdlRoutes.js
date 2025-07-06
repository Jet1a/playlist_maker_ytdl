import express from 'express'
import { downloadVideo } from '../controllers/ytdlController.js'

const router = express.Router()

router.get("/download", downloadVideo)

export default router