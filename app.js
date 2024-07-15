require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');// JWT 토큰을 사용하기 위해 추가 >> 예은
const cookieParser = require('cookie-parser'); // >> 예은
const { sequelize } = require('./models'); // Sequelize 인스턴스 가져오기
const PORT = process.env.PORT || 8080; // 포트를 환경 변수에서 가져오기

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/static', express.static(__dirname + '/static'));

// 데이터베이스 동기화
sequelize.sync();

// JWT 인증 미들웨어 >> 예은
const authenticateToken = (req, res, next) => {
  const token = req.cookies['token']; // 쿠키 이름 확인
  if (token == null) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = user;
    next();
  });
};

// 라우팅 분리
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
app.use('/user', userRouter);
app.use('/comment', authenticateToken, commentRouter);


app.get('/cardcomment', (req, res) => {
  res.render('card_comment')
})

// 404 에러 처리
app.get('*', (req, res) => {
  res.render('404');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/user`);
});
