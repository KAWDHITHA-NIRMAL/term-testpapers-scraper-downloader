import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { scrape_uris } from './controllers/scrape.js'
import { download } from './controllers/download.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import routes from './routes/routes.js'

dotenv.config()

const app = express()
const _port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//call bellow func to download files

async function start(grade, subject, _path) {
    const uris = await scrape_uris(grade, subject)
    const path = await download(uris, _path, grade, subject)
}

app.listen(_port, () => console.log(`Server is listening to port:${_port}`))
