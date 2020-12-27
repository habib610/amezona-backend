import express from 'express';
import mongoose from 'mongoose';
import data from  './data.js';
import userRouter from './Router/userRouter.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const port = process.env.PORT || 4000;

app.get('/', (req, res)=> {
    res.send('Server is ready');
})

app.get('/api/products/:id', (req, res)=> {
    const product = data.products.find(prd => prd._id === req.params.id);
    console.log(product)
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product not Found"})
    }
})

app.get('/api/products', (req, res)=> {
    res.send(data.products)
})


app.use('/api/users', userRouter);

app.use((err, req, res, next)=> {
    res.status(500).send({message: err.message})
})


app.listen(port, ()=> {
    console.log("listening port 4000")
})