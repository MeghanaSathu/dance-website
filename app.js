const express=require("express");
const path = require("path");

const app=express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');

}
const port=8000;
//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    text: String
  });
  var contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 // ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{ 
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item have been saved in database")
    }).catch(()=>{
        res.status(400).send("item has not been saved in database")
    });
    //res.status(200).render('contact.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});