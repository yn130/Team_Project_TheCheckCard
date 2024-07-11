const express = require('express');
const controller = require('../controller/Cuser');
const router = express.Router();

router.get('/', controller.main);

router.get('/signup', controller.signUp);

router.post('/signup', controller.postsignUp);

router.get('/login', controller.logIn);

router.post('/login', controller.postlogIn);

router.post('/logout', controller.logout);

// router.get('/check-token', controller.checkToken);

// 여기까진 체크완료 (postman 확인완료)

router.post('/profile', controller.postProfile);

router.delete('/profile/delete', controller.deleteProfile);

router.patch('/profile/edit', controller.patchProfile);



module.exports = router;
