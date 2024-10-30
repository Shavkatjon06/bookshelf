import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import valideasy from 'valideasy';

const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shavkatjon3663",
    database: "books"
})

app.get('/books', (req, res) => {
    try {
        const response = "select * from books.bookshelf"
        db.query(response, (err, data) => {
            if (err) {
                return res.json({error: true, message: err})
            } else {
                return res.json({success: true, message: data})
            }
        })
    } catch (error) {
        res.json({error: true, message: error.message})
    }
})


app.get('/books/:id', (req, res) => {
    try {
        const {id} = req.params
        const response = "select * from books.bookshelf where id = ?"
        db.query(response, [Number(id)], (err, data) => {
            if (err) {
                return res.json({error: true, message: err})
            } else {
                return res.json({success: true, message: data})
            }
        })
    } catch (error) {
        res.json({error: true, message: error.message})
    }
})


app.post('/new-book', (req, res) => {
    try {
        const {title, info, image} = req.body
        const requiredFields = ['title', "info", 'image']
        const errorMessage = valideasy(req.body, requiredFields)
        if (errorMessage) {
            return res.json({ error: true, message: errorMessage })
        }
        const response = "insert into books.bookshelf (`title`, `info`, `image`) values(?)"
        const values = [title, info, image]
        db.query(response,[values], (err, data) => {
            if (err) {
                return res.json({ error: true, message: err.message })
            } else {
                return res.json({success: true, message: "Successfully created"})
            }
        })
    } catch (error) {
        res.json({error: true, message: error.message})
    }
})


app.delete('/delete-book/:id', (req, res) => {
    try {
        const {id} = req.params
        const response = `delete from books.bookshelf where id = ${id}`
        db.query(response, (err, data) => {
            if (err) {
                return res.json({ error: true, message: err.message })
            } else {
                return res.json({success: true})
            }
        })
    } catch (error) {
        res.json({error: true, message: error.message})
    }
})


app.put('/update/:id', (req, res) => {
    const bookId = req.params.id
    const requiredFields = ['title', "info", 'image']
    const errorMessage = valideasy(req.body, requiredFields)
    if (errorMessage) {
        return res.json({ error: true, message: errorMessage })
    }
    const response = "update books.bookshelf set `title` = ?, `info` = ?, `image` = ? where id = ?"
    const values = [req.body.title, req.body.info, req.body.image]
    db.query(response, [...values, bookId], (err, data) => {
        if (err) {
            return res.json({error: true, message: err.message})
        } else {
            return res.json({success: true})
        }
    })
})

app.listen(8000)