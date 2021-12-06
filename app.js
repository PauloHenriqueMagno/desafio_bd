const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.json());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next()
});

const products = {
    comercial: [],
    porcoes: [],
    bebidas: [],
    sobremesas: [],
    lanches: [],
    dias: {
        segunda: [],
        terca: [],
        quarta: [],
        quinta: [],
        sexta: [],
        sabado: [],
    },
};

const orderList = (list) => {
    list = list.sort((a,b) => a.position - b.position);

    for(let i = list.length; i > 0; i--){
        list[i - 1].position = i;
    }

    return list
}

app.patch("/products/:type", (req, res) => {
    res.status(200).send(products)
});

app.post("/products/:type", jsonParser, (req, res) => {

    if(!!req.body.name && !!req.body.price){  
        const list = products[req.params.type];
        
        const lastProduct = list.length !== 0 ? list[list.length - 1] : {id: 0, position: 0};
        
        const newProduct = {
            "name": req.body.name,
            "price": req.body.price,
            "id": lastProduct.id + 1,
            "position": lastProduct.position + 1
        };
        
        products[req.params.type].push(newProduct);
        
        res.status(201).send(list);
    };

    res.status(400).send("Name and price are necessary, description is optional");
});

app.delete("/products/:type", (req, res) => {
    const id = req.body.id;
    const list = products[req.params.type];

    if(list.some(prod => prod.id == id)){
        products[req.params.type] = list.filter(prod => prod.id !== id);
        products[req.params.type] = orderList(products[req.params.type])
        res.status(202).send(products[req.params.type]);
    }
    else{
        res.status(400).send("Invalid ID");
    };
});

app.get("/", (req, res) => {
    res.send(200, products)
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})