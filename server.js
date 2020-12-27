import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './Router/productRouter.js';
import userRouter from './Router/userRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const port = process.env.PORT || 4000;

app.get('/', (req, res)=> {
    res.send('Server is ready');
})



app.use('/api/products', productRouter)

app.use('/api/users', userRouter);

app.use((err, req, res, next)=> {
    res.status(500).send({message: err.message})
})


app.listen(port, ()=> {
    console.log("listening port 4000")
})