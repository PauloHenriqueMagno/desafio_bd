const express = require('express');
const uuid = require('uuid');
const port = 3000;

const app = express();

app.use(express.json());

const products = {
    comercial: [
        {
            id: 1,
            position: 1,
            name: "Filé de Frango Grelhado",
            price: 18,
            description: "Arroz, feijão, batata frita e salda de alface, tomate e cenoura",
            img: ""
        },
    ],
    porcoes: [
        {
            id: 1,
            position: 1,
            name: "Fritas",
            price: 10,
            img: ""
        }
    ],
    bebidas: [
        {
            id: 1,
            position: 1,
            name: "Coca-Cola (lata)",
            price: 5,
            img: ""
        }
    ],
    sobremesas: [
        {
            id: 1,
            position: 1,
            name: "Pudim Inteiro",
            price: 20,
            img: ""
        }
    ],
    lanches: [
        {
            id: 1,
            position: 1,
            name: "X-Salada",
            price: 15,
            img: ""
        },
    ],
    day: {
        segunda: [
            {
                id: 1,
                position: 1,
                name: "Filé de Frango Grelhado",
                price: 18,
                description: "Arroz, feijão, batata frita e salda de alface, tomate e cenoura",
                img: ""
            },
        ],
        terca: [
            {
                id: 1,
                position: 1,
                name: "Filé de Frango Grelhado",
                price: 18,
                description: "Arroz, feijão, batata frita e salda de alface, tomate e cenoura",
                img: ""
            },
        ],
        quarta: [
            {
                id: 1,
                position: 1,
                name: "Filé de Frango Grelhado",
                price: 18,
                description: "Arroz, feijão, batata frita e salda de alface, tomate e cenoura",
                img: ""
            },
        ],
        quinta: [
            {
                id: 1,
                position: 1,
                name: "Filé de Frango Grelhado",
                price: 18,
                description: "Arroz, feijão, batata frita e salda de alface, tomate e cenoura",
                img: ""
            },
        ],
        sexta: [
            {
                id: 1,
                position: 1,
                name: "Filé de Frango Grelhado",
                price: 18,
                description: "Arroz, feijão, batata frita e salda de alface, tomate e cenoura",
                img: ""
            },
        ],
        sabado: [
            {
                id: 1,
                position: 1,
                name: "Filé de Frango Grelhado",
                price: 18,
                description: "Arroz, feijão, batata frita e salda de alface, tomate e cenoura",
                img: ""
            },
        ],
    },
};

app.patch("/products/:type", (req, res) => {
    res.send(200, products)
});

app.post("/products/:type", (req, res) => {

    if(!!req.body.name && !!req.body.price){
        const list = products[req.params.type];
        const lastProduct = list[list.length - 1];

        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            id: lastProduct.id + 1,
            position: lastProduct.position + 1
        };
        
        products[req.params.type].push(newProduct);

        res.send(201, list);
    };

    res.send(400, "Name and price are necessary, description is optional");
});

app.get("/", (req, res) => {
    res.send(200, products)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})