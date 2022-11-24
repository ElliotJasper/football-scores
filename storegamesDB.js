require('dotenv').config();


const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const games = require('./request');
const date = require('./getdate');

const URI = 'mongodb+srv://elliotadmin:' + process.env.PASSWORD + '@lastmanstanding.oqj3y.mongodb.net/?retryWrites=true&w=majority';
// testing compare
// mongodb+srv://elliotadmin:<password>@lastmanstanding.oqj3y.mongodb.net/?retryWrites=true&w=majority
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if (err) throw (err);
    let db = client.db('lastmanstanding-scores');
    let query = { date: date.formatDateAPI };
    /*let newValues = { $set: {
        homeName: games.game.homeName,
        homeScore: games.game.homeScore,
        awayName: games.game.awayName,
        awayScore: games.game.awayScore,
    }};*/

    db.collection('last-man-standing').find(query).toArray((err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            db.collection('last-man-standing').deleteMany(query, (err, result) => {
                if (err) throw err;
                console.log('Document Deleted');
            });
            db.collection('last-man-standing').insertMany(games.allScores, (err, result) => {
                if (err) throw err;
                console.log('Document Updated');
                client.close();
            });
        } else {
            db.collection('last-man-standing').insertMany(games.allScores, (err, result) => {
                if (err) throw err;
                console.log('Document Inserted');
                client.close();
            })

    }})
});



    
    




