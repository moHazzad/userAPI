import express, { Request, Response } from'express'
import cors from 'cors'
import { UserRoute } from './app/module/user.route';
const app = express()

// parser
app.use(express.json());
app.use(cors());

app.use('/api', UserRoute )

// app.get('/', (req: Request , res: Response) => {
//   res.send('Hello World!')
// })

export default app

