import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { router } from './app/routes/index.js'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler.js'
import notFound from './app/middlewares/notFoundMiddleware.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to the basic tour app"
    })
})

app.use(globalErrorHandler)

app.use(notFound)

export default app;