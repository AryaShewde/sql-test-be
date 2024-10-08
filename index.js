import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
// require("dotenv").config()
import dotenv from "dotenv"
dotenv.config()

const app = express()

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello this is backend")
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err, data)=>{
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.cover ]

    db.query(q, [values], (err, data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("Book has been created successfully")
    })
})

app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?,`desc` = ?, `cover` = ? WHERE id = ?";

    const values = [req.body.title, req.body.desc, req.body.cover ]

    db.query(q, [...values, bookId], (err, data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("Book has been updated successfully")
    })
})

app.listen(5000, ()=>{
    console.log("Connected to port http://localhost:5000")
})