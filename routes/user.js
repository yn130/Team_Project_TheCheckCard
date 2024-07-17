const express = require('express');
const controller = require('../controller/Cuser');
const router = express.Router();
// 이거 삭제! 메인은 카테코리페이지(index) 설정됨!
// router.get('/', controller.main);
router.get('/signup', controller.signUp);
router.post('/signup', controller.postsignUp);
router.get('/login', controller.logIn);
router.post('/login', controller.postlogIn);
router.post('/logout', controller.logout);
// router.get('/check-token', controller.checkToken);
// 여기까진 체크완료 (postman 확인완료)
// router.post('/profile', controller.postProfile);
// router.delete('/profile/delete', controller.deleteProfile);
// router.patch('/profile/edit', controller.patchProfile);
// 로그인 로그아웃 버튼변경용
// router.post('/logout', controller.logout);
router.get('/checkLoginStatus', controller.checkLoginStatus);
module.exports = router;