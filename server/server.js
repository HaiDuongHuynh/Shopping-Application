const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const users = [
    {
        id: 1,
        username: "admin",
        password: "admin"
    },
    {
        id: 2,
        username: "admin1",
        password: "admin2"
    }
]

const products = [
    {
        id: 1,
        price: 1.99,
        name: "apple",
        stock: 30,
        img: "https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png"
    },
    {
        id: 2,
        price: 2.99,
        name: "peach",
        stock: 20,
        img: "https://images.freeimages.com/images/large-previews/df3/peach-1172469.jpg"
    },
    {
        id: 3,
        price: 6.99,
        name: "watermelon",
        stock: 5,
        img: "https://i5.walmartimages.com/seo/Fresh-Personal-Watermelon-Each_14487aaf-d86a-4b46-acaf-7621b90286bb.fb737768267fcdc95c33f355b730ad15.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF"
    },
    {
        id: 4,
        price: 7.99,
        name: "grape",
        stock: 12,
        img: "https://img.imageboss.me/fourwinds/width/425/dpr:2/shop/products/blackmonukka.jpg?v=1538780984"
    },
    {
        id: 5,
        price: 3.99,
        name: "orange",
        stock: 15,
        img: "https://www.quanta.org/thumbs/thumb-orange-640x480-orange.jpg"
    },

]


const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


var loggedIn = [];


app.get("/", (req, res) => {
    res.send("hello");
})

app.get("/update-stock", (req, res) => {
    const query = req.query;

    console.log(query)


    if (loggedIn.indexOf(query.user) != -1) {
        const product = products.filter(product => {
            return query.id == product.id;
        })


        product[0].stock -= Number(query.quantity);


        res.status(200);
    }

    res.status(400);

})

app.post("/login", (req, res) => {
    const logInInfo = req.body;
    let response = null;
    let status = 200;

    const user = users.filter(user => {
        return user.username == logInInfo.username && user.password == logInInfo.password
    })

    if (user.length > 0) {

        const data = `${user[0].username},${Date.now()}`

        loggedIn.push(data)


        response = data;
    } else {
        response = "Error, User could not be found.";
        status = 404;
    }


    res.setHeader('Content-Type', 'application/json');

    console.log(user)

    res.status(status).json({ status, response })

})

app.get("/logout", (req, res) => {
    const user = req.query.user;
    loggedIn.splice(loggedIn.indexOf(user), 1);
    res.status(200);
})

app.get("/products", (req, res) => {
    res.json(products)
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})