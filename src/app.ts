import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { router } from './app/routes/index.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to the basic tour app"
    })
})

export default app;