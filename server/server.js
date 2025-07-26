import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import helmet from 'helmet'
import ytdlRoutes from './routes/ytdlRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())


app.use('/api/ytdl', ytdlRoutes)

app.get('/health', (req, res) => {
   res.send('Server is Healthy')
})

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`)
})
