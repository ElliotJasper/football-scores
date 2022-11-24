require('dotenv').config();


const { response } = require('express');
const express = require('express');

const app = express();

// Connect to Database
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const URI = 'mongodb+srv://elliotadmin:' + process.env.PASSWORD + '@lastmanstanding.oqj3y.mongodb.net/lastmanstanding-scores?retryWrites=true&w=majority';
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if (err) throw err;
});
const db = client.db();
const lastManCollection = db.collection('last-man-standing');



app.use(express.json());


app.get('/api/info', (req, res) => {
    getData = lastManCollection.find({ }).toArray()
    .then(response => {
        console.log(response)
        res.json(response)
        res.end()
    })
    .catch(err => {
        if (err) throw err
    })
});

app.get('/api/info/:homeName', (req, res ) => {
    const homeName = req.params.homeName
    console.log(homeName) 
    getData = lastManCollection.find({ homeName: homeName }).toArray()
    .then(response => {
        console.log(response)
        const awayNameArray = []
        for(i=0;i<response.length;i++) {
            awayNameArray.push(response[i].awayName)
        }
        res.json(awayNameArray)
        res.end()
    })
    .catch(err => {
        if (err) throw err
    })
});




app.listen(8000, () => {
    console.log('Server running on port 8000');
})

