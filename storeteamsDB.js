require('dotenv').config();

const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const games = require('./request');
const date = require('./getdate');

const URI = 'mongodb+srv://elliotadmin:' + process.env.PASSWORD + '@lastmanstanding.oqj3y.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) throw err;
    let db = client.db('lastmanstanding-scores');
    let query = { date: date.formatDateAPI };

    db.collection('singleteam').find(query).toArray((err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            db.collection('singleteam').deleteMany(query, (err, result) => {
                if (err) throw err;
                console.log('Document Deleted');
            })
            db.collection('singleteam').insertMany(games.allTeam, (err, result) => {
                if (err) throw err;
                console.log('Document Updated');
                client.close();
            });
        } else {
            db.collection('singleteam').insertMany(games.allTeam, (err, result) => {
                if (err) throw err;
                console.log('Document Inserted');
                client.close();
            });
        }
    })
    
    
    

});