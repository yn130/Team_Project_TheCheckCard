const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/encrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// 카테고리페이지(index) / 3개카트추천페이지(commend) 생성 완료 -> 따라서 아래 주석처리된 거 삭제하기!
// exports.main = (req, res) => {
//     res.render('commend');
// };
exports.signUp = (req, res) => {
    res.render('signup');
}
exports.logIn = (req, res) => {
    res.render('login');
};
exports.postsignUp = async (req, res) => {
    try {
        const { userid, nickname, password } = req.body;
        // const existingUser = await User.findOne({ where: { userid } });
        const validatePassword = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        }
        if (!validatePassword(password)) {
            return res.status(400).send({ message: "password error"});
        }
        // if (existingUser) {
        //     return res.status(400).send({ message: 'User ID already exists' });
        // } 이유 : model에서 이미 중복인지 아닌지 추려내고 있다.
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ userid, nickname, password: hashedPassword });
        res.send({ id: newUser.id, userid, nickname });
    } catch (error) {
        console.error('Error in postsignUp:', error);
        res.status(500).send({ message: error.message });
    }
};
// 회원가입 (비밀번호 정규표현식에 맞는지-> controller / 아이디, 닉네임 중복 방지-> model에서 진행)
// 이거에 대해서 생각해보고 공부해보길 바람... 의견을 내고 이야기한다면 좋은 주제가 될거 같다(코드 설계)
exports.postlogIn = async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const { userid, password } = req.body;
        const user = await User.findOne({ where: { userid } });
        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        // jsonwebtoken 모듈 다운후에 저장하면 된다... +
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true, // 클라이언트 접근불가
            secure: true, // HTTPS에서만 전송 / 보안상 높음
            sameSite: 'strict', // 같은 사이트에서만 쿠키 전송
            maxAge: 3600000 // 1시간 (밀리초 기준)
        });
        console.log('Token:', token); // 쿠키 제대로 사용확인 완료
        res.send({ message: '로그인 성공', token });
    } catch (error) {
        console.error('Error in postsignIn:', error);
        res.status(500).send({ message: error.message });
    }
};
//
// Cuser.js
exports.logout = (req, res) => {
    try {
        res.clearCookie('token', { path: '/' });
        res.send({ message: '로그아웃 성공' });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).send({ message: '로그아웃 중 오류가 발생했습니다.' });
    }
};
exports.checkLoginStatus = (req, res) => {
    if (req.cookies.token) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
}; // 로그아웃은 백 : res에 로그아웃 메세지 보내기 / 프론트 : localstorage안에 있는 토큰 비우기로 역할 확실히 분담
   // localhistory일땐 프론트에서 비우면 그만이지만, 쿠키는 서버에서 비우게 할 수 있음.... 따라서 clearCookie사용 (차이점)
exports.checkToken = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(500).send({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        res.json({ loggedin: true });
    });
};
// profile전에 있는 로직 전체 확인 완료
exports.postProfile = async (req, res) => {
    try {
        const { userid } = req.body;
        const user = await User.findOne({ where: { userid } });
        res.render('profile', { data: user });
    } catch (error) {
        console.error('Error in postProfile:', error);
        res.status(500).send({ message: error.message });
    }
};
exports.patchProfile = async (req, res) => {
    try {
        const { id, pw, name } = req.body;
        const hashedPassword = await hashPassword(pw);
        await User.update({ pw: hashedPassword, name }, { where: { id } });
        res.send({ message: '회원 정보가 수정되었습니다.' });
    } catch (error) {
        console.error('Error in patchProfile:', error);
        res.status(500).send({ message: error.message });
    }
};
exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.body;
        await User.destroy({ where: { id } });
        res.send({ message: '회원 정보가 삭제되었습니다.' });
    } catch (error) {
        console.error('Error in deleteProfile:', error);
        res.status(500).send({ message: error.message });
    }
};
// 로그인 로그아웃 버튼 변경
// controller/Cuser.js
exports.checkLoginStatus = (req, res) => {
    if (req.cookies.token) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
};