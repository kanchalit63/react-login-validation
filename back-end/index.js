const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')


app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // เปลี่ยน name เป็น user
    password: "",
    database: "signup"
});



app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting values");
        }
        console.log("User inserted:", data);
            res.status(200).send("User registered successfully");
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` =? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting values");
        }
        if(data.length > 0){
            return res.json("Success")
        }else{
            return res.json("Faile")
        }
    });
});




app.listen(5050,()=>{
    console.log("Server is running in port 5050")
})