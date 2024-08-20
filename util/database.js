const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://krishnakarn911:zotz4gPpsVT4CrpY@ecommerce.7lpyf.mongodb.net/'
  )
    .then(client => {
      console.log('Connected!');
      db=client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = ()=>{
  if(db){
    return db;

  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;