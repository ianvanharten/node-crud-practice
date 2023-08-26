import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
const PORT = 8800

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_practice"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("This is the backend.")
})

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"
  db.query(q, (error, data) => {
    if (error) return error
    return res.json(data)
  })
})

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Book has been created successfully.")
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})