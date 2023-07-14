import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { scrape } from './controllers/scrape.js'

dotenv.config()

const app = express()
const _port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
scrape()

app.listen(_port, ()=>console.log(`Server is listening to port:${_port}`))
