const express =require('express');
const mysql= require('mysql');
const cors= require('cors');
const bodyParser=require('body-parser');

const PORT= process.env.PORT || 1200;
const app =express();

const connection= mysql.createConnection({
    database: 'pizzaApp',
    user:'root',
    password:''
})

connection.connect(()=> console.log('database connecting'));

app.use(cors());
app.use(bodyParser.json())

app.get('/getProduct',(req,res)=>{
    connection.query('SELECT * FROM product',(err,data)=>{
        if(err) throw err

        console.log('first')
        res.send(data)
    })
})


app.get('/getProductBy/:filter',(req,res)=>{
    let filterBy=req.params.filter;

        if(filterBy==='популярности'){
            connection.query('SELECT * FROM product',(err,data)=>{
                if(err) throw err
        
                console.log(data)
                res.send(data)
            })
        }else if(filterBy==='по цене'){
            connection.query('SELECT * FROM product ORDER BY price DESC',(err,data)=>{
                if(err) throw err
        
                console.log(data)
                res.send(data)
            })
        }else if(filterBy==='по алфавиту'){
            connection.query('SELECT * FROM product ORDER BY name ',(err,data)=>{
                if(err) throw err
        
                console.log(data)
                res.send(data)
            })
        }
     
    
    
    
})







app.listen(PORT,()=> console.log(`server run in Port ${PORT}`))