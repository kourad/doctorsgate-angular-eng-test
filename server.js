
const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use( express.static('src') );
app.use( bodyParser.json() )





let stock = [
    {name: "Cookies", price: 1, stock: 10, tax: 1.21, total_stock_price: 12.1  },
    {name: "bread", price: 15, stock: 20, tax: 18.15, total_stock_price: 363 },
    {name: "Cofee", price: 2, stock: 32, tax: 2.42, total_stock_price: 77.44},
    {name: "Teapot", price: 46, stock: 98, tax: 55.66, total_stock_price: 5454.68},
    {name: "Water", price: 18, stock: 48, tax: 28.08, total_stock_price: 1347.84}
]

app.use( function( req, res, next )
{
    res.setHeader( "Access-Control-Allow-Origin", "*" )
    next();
} )



app.get( '/stock', (req, res) => {
    res.status(200).send( { stock } )
} )

app.post( '/stock', (req, res) => {

    try
    {
        if( req.body.name === undefined || req.body.price === undefined || req.body.amount === undefined )
            return res.status(400).send(`Expected a JSON like: {name:"foo", price: 5, amount: 5}`)


        let aux = {}

        aux.name = req.body.name;
        aux.price = req.body.price;
        aux.stock = req.body.amount;

        aux.tax = aux.price + (aux.price*0.21)
        aux.total_stock_price = aux.tax * aux.stock
    
        stock.push(aux)
    
        res.status(200).send( aux )
    }
    catch(error)
    {
        res.status(500).send( error )
    }
} )


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
