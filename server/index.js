const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createPool({
    host: "130.211.126.254",
    user: "quizify-host",
    password: "XJ0461",
    database: "408project"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    console.log("Received: " + movieName + " - " + movieReview);

    const sqlInsert = "INSERT INTO movies (name, review) VALUES (?,?);";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        // console.log(result);
        // console.log(err);
    })
});

app.listen(3001, () => {
    console.log('running on port 3001');
});