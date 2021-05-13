const express = require('express');
const app = express();

// mongodb client
//conection string
const connectionString = "mongodb://localhost:27017"
const MongoClient =require('mongodb').MongoClient;

const client = new MongoClient(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology: true
});
app.get('/students', (req, res) =>{
    client.connect((err, connectedClient) =>{
        if (err) return res.status(500).json({message: 'cant fetch data, try again later'})
        const db = connectedClient.db("school");
        db.collection("students").find({}).toArray((err, result) => {
            if (err){
                return res.status(500).json({message: "cant fetch data"})

            }
            return res.status(200).json({students: result})
        })
    })
})
var myquery = { name: "joshua" };
var newvalues = { $set: {name: "loye" } };
app.put('/updatestudents', (req, res) =>{
    client.connect((err, connectedClient) =>{
        if (err) return res.status(500).json({message: 'cant update data, try again later'})
        const db = connectedClient.db("school");
        db.collection("students").updateOne(myquery, newvalues, function(err, res) {
            if (err){
                return res.status(500).json({message: "cant update data"})

            }
            return res.status(200).json([{students: result},{message:"data updated"}])
        })
    })
})


var myquery = { name: "joshua" };

app.put('/deletestudents', (req, res) =>{
    client.connect((err, connectedClient) =>{
        if (err) return res.status(500).json({message: 'cant delete data, try again later'})
        const db = connectedClient.db("school");
        db.collection("students").deleteOne(myquery,  function(err, obj) {
            if (err){
                return res.status(500).json({message: "cant delete data"})

            }
            return res.status(200).json([{students: result},{message:"delete updated"}])
        })
    })
})

app.listen(4000, () => console.log('server up and running'))