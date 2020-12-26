import express from 'express';
import data from  './data.js';

const app = express();



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

app.listen(port, ()=> {
    console.log("listening port 4000")
})