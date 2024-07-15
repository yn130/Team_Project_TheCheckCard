const express = require('express');
const router = express.Router();
const commentController = require('../controller/CComment');

// 댓글 페이지 보여주기
router.get('/', commentController.showComments);

// 댓글 추가하기
router.post('/', commentController.addComment);

// 댓글 수정하기
router.patch('/edit/:id', commentController.editComment);

// 댓글 삭제하기
router.delete('/delete/:id', commentController.deleteComment);

module.exports = router;
