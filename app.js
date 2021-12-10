const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5001;
const app = express();

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
    week: {
        segunda: [],
        terca: [],
        quarta: [],
        quinta: [],
        sexta: [],
        sabado: [],
    },
};

const admin = {
    id: 1,
    password: "$2b$10$YGR8/jneqGb2wF9Vppu1euKwKcmy09qnHr8SWU12fOppNV1i8sWK2"
};

const orderList = (list) => {
    list = list.sort((a,b) => a.position - b.position);

    for(let i = list.length; i > 0; i--){
        list[i - 1].position = i;
    }

    return list
};

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    jwt.verify(token, admin, (err, decoded) => {
        if(err){
            return res.status(401).send("É necessario estar logado");
        };

        next();
    });
};

app.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    if(await bcrypt.compare(req.body.password, admin.password)){
        admin.password = hashedPassword;

        res.status(202).send("Nova senha salva");
    }
    else{
        res.status(400).send("Senha incorreta");
    };

});

app.post("/login", async (req, res) => {    
    if(await bcrypt.compare(req.body.password, admin.password)){
        const token = jwt.sign({id: 1}, admin, {expiresIn: 3600000})
        res.status(202).send({ message: "Senha incorreta" });
    }else{
        res.status(400).send({ message: "Senha incorreta" });
    }
});

app.put("/products/:type/:id", (req, res) => {
    verifyToken(req, res);

    const { type, id } = req.params;
    const { name, price, details, image, position } = req.body;
    const atualPosition = products[type].filter(prod => prod.id == id)[0].position;

    if(products[type].some(prod => prod.id == id)){
        const listMap = products[type].map(prod => {
            if(!!position && prod.position >= position && prod.id != id){
                if(prod.position == position && prod.position > atualPosition){
                    prod.position = prod.position - 1;
                }
                else{
                    prod.position = prod.position + 1;
                }
            };
            if(prod.id == id){
                if(!!name){ prod.name = name };
                if(!!price){ prod.price = price };
                if(!!details){ prod.details = details };
                if(!!image){ prod.image = image };
                if(!!position){ prod.position = position };
            };

            return prod;
        });

        products[type] = orderList(listMap);

        res.status(200).send(listMap);
    }
    else{
        res.status(400).send("Invalid ID");
    }
});

app.put("/products/dias/:day/:id", (req, res) => {
    verifyToken(req, res);

    const { day, id } = req.params;
    const { name, price, details, image, position } = req.body;
    const atualPosition = products.week[day].filter(prod => prod.id == id)[0].position;

    if(products.week[day].some(prod => prod.id == id)){
        const listMap = products.week[day].map(prod => {
            if(!!position && prod.position >= position && prod.id != id){
                if(prod.position == position && prod.position > atualPosition){
                    prod.position = prod.position - 1;
                }
                else{
                    prod.position = prod.position + 1;
                }
            };
            if(prod.id == id){
                if(!!name){ prod.name = name };
                if(!!price){ prod.price = price };
                if(!!details){ prod.details = details };
                if(!!image){ prod.image = image };
                if(!!position){ prod.position = position };
            };

            return prod;
        });

        products.week[day] = orderList(listMap);

        res.status(200).send(listMap);
    }
    else{
        res.status(400).send("Invalid ID");
    }
});

app.post("/products/:type", (req, res) => {
    verifyToken(req, res);

    const { name, price, details, image } = req.body

    if(!!req.body.name && !!req.body.price && !!req.body.image){  
        const list = products[req.params.type];
        const lastProduct = list.length !== 0 ? list[list.length - 1] : {id: 0, position: 0};
        
        const newProduct = {
            "name": name,
            "price": price,
            "details": details,
            "id": lastProduct.id + 1,
            "position": lastProduct.position + 1,
            "image": image
        };
        
        products[req.params.type].push(newProduct);
        
        res.status(201).send(list);
    };

    res.status(400).send("Name and price are necessary, description is optional");
});

app.post("/products/dias/:day", (req, res) => {
    verifyToken(req, res);

    const { name, price, details, image } = req.body;
    const { day } = req.params;

    if(!!req.body.name && !!req.body.price && !!req.body.image){  
        const lastProduct = list.length !== 0 ? list[list.length - 1] : {id: 0, position: 0};
        
        const newProduct = {
            "name": name,
            "price": price,
            "details": details,
            "id": lastProduct.id + 1,
            "position": lastProduct.position + 1,
            "image": image
        };
        
        products.week[day].push(newProduct);
        
        res.status(201).send(list);
    };

    res.status(400).send("Name and price are necessary, description is optional");
});

app.delete("/products/:type", (req, res) => {
    verifyToken(req, res);

    const { id } = req.body;
    const { type } = req.params;

    if(products[type].some(prod => prod.id == id)){
        const listFilter = products[type].filter(prod => prod.id !== id);
        products[type] = orderList(listFilter);
        res.status(202).send(listFilter);
    }
    else{
        res.status(400).send("Invalid ID");
    };
});

app.delete("/products/dias/:day", (req, res) => {
    verifyToken(req, res);

    const { id } = req.body;
    const { day } = req.params;

    if(products.week[day].some(prod => prod.id == id)){
        const listFilter = products.week[day].filter(prod => prod.id !== id);
        products.week[day] = orderList(listFilter);
        res.status(202).send(listFilter);
    }
    else{
        res.status(400).send("Invalid ID");
    };
});

app.get("/", (req, res) => {
    res.status(200).send(products)
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})