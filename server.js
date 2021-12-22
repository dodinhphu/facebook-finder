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
const hbs_sections = require('express-handlebars-sections');
/* templex engin */
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        section: hbs_sections(),
        kt_register: (a, b) => {
            return a === b;
        },
        kt_bang0: (a) => {
            return a === 0;
        },
        kt_so: (a, b) => {
            a = parseInt(a);
            b = parseInt(b);
            return a === b;
        },
        total: (a, b) => {
            return a + b;
        },
        phan_loai: (a) => {
            if (a === '1') {
                return '<span class="chumau badge bg-primary">Notification</span>'
            }
            else if (a === '2') {
                return '<span class="chumau badge bg-warning text-dark">Require</span>'
            }
            else if (a == '3') {
                return '<span class="chumau badge bg-danger">Warning</span>'
            }
            else {
                return '<span class="chumau badge bg-info text-dark">Others</span>'
            }
        },
        chuyen_post(data) {
            let post = data.posts;

            if (post.length > 0) {
                let html = '';
                for (let i = 0; i < post.length; i++) {
                    let anh_ = '/images/profile_none.png';
                    if (post[i].author.includes(data.name)) {
                        anh_ = data.avt_imgs[0];
                    }
                    html += `
                    <div class="post_post khoi__ row">
                         <div class="">
                            <div class="author">
                                        <div class="author_img" style="background-image: url('${anh_}')"></div>
                                        <div class="ten_tg">
                                            <div class="ten_author">${post[i].author}</div>
                                            <div class="time_post">${post[i].time}</div>
                                        </div>
                                    </div>
                                    <div class="content_post">
                                    ${post[i].content}
                                    </div>
                                    <div class="den_fb">
                                        <a href="${post[i].link}">
                                            <button style="float: right;margin: 16px -22px -12px 0;" class="btn btn-primary">Details
                                                Status
                                            </button>
                                        </a>
                                </div>
                         </div>       
                    </div>
                    `
                }
                return html;
            }
            else {
                return '<div>No Data</div>'
            }
        }
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