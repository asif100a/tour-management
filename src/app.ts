import express, { type NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import { router } from './app/routes/index.js'
import { envConfig } from './app/config/env.js'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to the basic tour app"
    })
})

app.use(globalErrorHandler)

export default app;