const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const { info } = require("console");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
// 암호화 할때 사용할 문자열 
// app.use(cookieParser("xxxxx"));
app.use(session({
    secret: "secret key",
    // 세션에 변화가 없어도 저장 할건지 안할건지 정함
    resave: false,
    // 세션에 저장할 내용이 없어도 저장 한다 안한다 정함
    saveUninitialized: true,
    // 클라이언트 측에서 접근
    // httpOnly,
    // https
    // secure : true,
    // 세션 id에 대한 (브라우저가 갖고있는)
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, //하루
        httpOnly: true
    }
}));


// app.get('/', (req, res) => {
//     res.cookie("key0", "value0", {
//         //ms 단위 (몇초 뒤 까지인지)
//         maxAge: 10000,
//         // gmt 시간 설정
//         // expores: ,
//         // 호스트 주소 다음에 나옴 (설정 안하면 default)( 쿠키 저장 )
//         // path : "/get",
//         // cookie가 언제 실행? true => https 서버에서만 실행 (로컬에선 동작 X) 
//         // secure : 기본 -> false
//         // document.cookie로 접속 가능 여부 (true로 할 시 script(클라이언트)에서 접근 불가하게 하고자 할 시)
//         httpOnly: true,
//         signed: true

//     });
//     res.render("index");
// });
// ///////////////////////////////////////////////
// const cookieConfig = {
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000
// };

// app.get("/", (req, res) => {
//     res.render("test", {
//         popup: req.cookies.popup
//     });
// })
// app.post('/setcookie', (req, res) => {
//     // 쿠키 생성.
//     res.cookie('popup', 'hide', cookieConfig);
//     res.send("쿠키 설정 성공");
// });
////////////////////////////////////////////////////////

// });
// // app.post("/profile", (req, res) => {
// //     if (req.session.user != undefined) {
// //         res.render("profile");
// //     } else {
// //         res.redirect("/login");
// //     }


///////////////////////////////////////////////////////////

// 클라이언트에서 갖고 있는 cookie 
// app.get("/get", (req, res) => {
//     // res.send(req.cookies);
//     // 암호화
//     res.send(req.signedCookies);
// });
app.get("/", (req, res) => {
    const user = req.session.user;
    console.log(req.session)
        // res.render("login");
    if (user != undefined)
        res.render("index", { isLogin: true, user: user })
    else {
        res.render("index", { isLogin: false })
    }
});
app.get("/login", (req, res) => {

    res.render("login");
});
var infor = { id: "a", pw: "b" }
app.post("/login", (req, res) => {
    if (req.body.id == infor.id && req.body.pw == infor.pw) {
        req.session.user = req.body.id;
        res.redirect("/");

    } else {
        res.send(
            `<script>
            alert("로그인 실패");
            location.href="/";
            </script>`
        );

    }
});

app.get("/logout", (req, res) => {
    const user = req.session.user;
    if (user != undefined) {
        req.session.destroy(function(err) {
            res.send(
                `<script>
                    alert('로그아웃 성공');
                    location.href='/';
                </script>`
            )
        });
    } else {
        res.send(
            `<script>
                    alert('잘못된 접근입니다.');
                    location.href='/';
                </script>`
        );
    };
});


app.listen(port, () => {
    console.log("Server Port : ", port);
});