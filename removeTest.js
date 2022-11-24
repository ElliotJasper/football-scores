const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const URI = 'mongodb+srv://elliotadmin:3MsiA3BAo1ARqwVU@lastmanstanding.oqj3y.mongodb.net/lastmanstanding-scores?retryWrites=true&w=majority';
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if (err) throw (err);
    let db = client.db();
    db.collection('singleteam').remove();

})
client.close();
