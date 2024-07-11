const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CComment');


router.get('/comments', commentController.getComment);
router.get('/comments',commentController.getComments);
router.post('/comment/post', commentController.createComment);
router.patch('/comment/update', commentController.updateComment);
router.delete('/comment', commentController.deleteComment);

module.exports = router;