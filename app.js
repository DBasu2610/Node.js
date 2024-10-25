const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');
const path = require('path');
const rootDir = require('./util/path');

const app = express();

app.set('view engine','pug');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute); 

app.use((req,res,next)=> {
    res.status(404).render('404',{docTitle: 'Page Not Found'});
});


app.listen(3000);
