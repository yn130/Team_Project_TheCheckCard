const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/encrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.main = (req, res) => {
    res.render('index');
};

exports.signUp = (req, res) => {
    res.render('signup');
}

exports.postsignUp = async (req, res) => {
    try {
        const { userid, name, pw } = req.body;
        const existingUser = await User.findOne({ where: { userid } });

        if (existingUser) {
            return res.status(400).send({ message: 'User ID already exists' });
        }

        const hashedPassword = await hashPassword(pw);
        const newUser = await User.create({ userid, name, pw: hashedPassword });
        res.send({ id: newUser.id, userid, name });
    } catch (error) {
        console.error('Error in postsignUp:', error);
        res.status(500).send({ message: error.message });
    }
};

exports.signIn = (req, res) => {
    res.render('signin');
};

exports.postsignIn = async (req, res) => {
    try {
        const { userid, pw } = req.body;
        const user = await User.findOne({ where: { userid } });

        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const match = await comparePassword(pw, user.pw);
        if (!match) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: '로그인 성공', token });
    } catch (error) {
        console.error('Error in postsignIn:', error);
        res.status(500).send({ message: error.message });
    }
};

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

exports.logout = (req, res) => {
    try {
        // 클라이언트 측에서 토큰 삭제를 유도하기 위해 빈 토큰을 전송
        res.send({ message: '로그아웃 되었습니다.' });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).send({ message: '로그아웃 중 오류가 발생했습니다.' });
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
