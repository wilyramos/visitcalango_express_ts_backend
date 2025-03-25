import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db'
import cors from 'cors'
import {corsConfig} from './config/cors'
import userRouter from './routes/userRoute'
import placeRouter from './routes/placeRouter'



connectDB()
const app = express()
// app.use(cors(corsConfig));


// morgan: HTTP request logger middleware for node.js
app.use(morgan('dev'))

// Body parser
app.use(express.json())

// Routes
app.use('/api/auth', userRouter)
// app.use('/api/users', userRouter)

app.use('/api/place', placeRouter)


export default app