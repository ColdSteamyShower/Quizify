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

// server dependencies
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// get template
    // app.get("/api/get", (req, res) => {

    //     const params = req.query;

    //     db.query("SELECT * FROM attributes;", (err, result) => {
    //         res.send(result);
    //         console.log("result:" + result);
    //         console.log("error:" + err);
    //     })
    // });

// get artists for artist selection
app.get("/api/get/artist", (req, res) => {

    const searchTerm = req.query.searchTerm;

    searchTerm ?
        db.query("SELECT name FROM artists WHERE name LIKE concat('%',?,'%') LIMIT 100;", [searchTerm], (err, result) => {
            res.send(result);
            // console.log("result:" + result);
            // console.log("error:" + err);
        })
    :
        db.query("SELECT name FROM artists LIMIT 100;", (err, result) => {
            res.send(result);
            // console.log("result:" + result);
            // console.log("error:" + err);
        });        
});

// get 2 random songs
    app.get("/api/get/randomsongs", (req, res) => {

        const artistList = req.query.artistList;
        const attribute = req.query.attribute;

        console.log(attribute);

        if (artistList) {
            console.log("Artists found");
            console.log(artistList);

            let query = 
                "SELECT s.title, name, s.?? value FROM artists " +
                "INNER JOIN " +
                "(SELECT * FROM songs) as s ON s.aID = artists.aID WHERE " ;

            artistList.forEach((element, index) => {
                query += "artists.name = \'" + artistList[index] + "\'";
                if ((index+1) < artistList.length) {
                    query += " OR "
                }
            });
                    
            query += " ORDER BY RAND() LIMIT 2;";

            console.log(query);
            
                db.query(query, [attribute], (err, result) => {
                    res.send(result);
                    console.log("serving songs: " + result);
                    console.log("error:" + err);
                })
        } else {
            console.log("No artists found");
            let query = 
                "SELECT s.title, name, s.?? value FROM artists " +
                "INNER JOIN " +
                    "(SELECT * FROM songs ORDER BY RAND() LIMIT 2) as s  " +
                "ON s.aID = artists.aID";

            db.query(query, [attribute], (err, result) => {
                res.send(result);
                console.log("serving songs: " + result);
                console.log("error: " + err);
            })
        }
    });

// get a random attribute
app.get("/api/get/randomattribute", (req, res) => {

    let query = 
        "SELECT * FROM attributes ORDER BY RAND() LIMIT 1;"

    db.query(query, (err, result) => {
        res.send({attribute: result});
        console.log("serving attribute: " + result[0].name);
        console.log("error: " + err);
    }) 
});

// get leaderboard
    app.get("/api/get/leaderboard", (req, res) => {


        db.query("SELECT * FROM leaderboard_view ORDER BY score;", (err, result) => {
            res.send(result);
            console.log("result:" + result);
            console.log("error:" + err);
        })
    });

app.listen(3001, () => {
    console.log('running on port 3001');
});