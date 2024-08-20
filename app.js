const mongoose=require("mongoose");

const path = require('path');
const dotenv=require('dotenv');
dotenv.config({path: './config.env'});

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findById(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));
  next();
});

 app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);



const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

console.log(DB);

mongoose.connect('mongodb+srv://krishnakarn911:zotz4gPpsVT4CrpY@ecommerce.7lpyf.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con=>{
    console.log('DB Connection successful');
})

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App running in port: ${port}`);
});

