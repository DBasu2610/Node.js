const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');
const path = require('path');
const rootDir = require('./util/path');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('handlebars',expressHbs());
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute); 

app.use((req,res,next)=> {
    res.status(404).render('404',{pageTitle: 'Page Not Found'});
});


app.listen(3000);
