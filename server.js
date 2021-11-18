const path = require('path');
require('dotenv').config();
const db = require('./config/db');
db.connectDB();
const express = require('express');
const app = express();
/*  */
const cookieParser = require('cookie-parser');
app.use(cookieParser());
/*  */
app.use(express.urlencoded());
app.use(express.json());
/*  */
app.use(express.static(path.join(__dirname, 'src/public')));
const exphbs = require('express-handlebars');
/* templex engin */
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/resources/views'))

/*  */
const cors = require('cors');
app.use(cors());
/*  */
app.use(express.json());
const port = process.env.APP_PORT || 5000;

// export router
const router = require('./routes/index');
router(app);
app.listen(port, () => {
    console.log('server listen port ', port);
});