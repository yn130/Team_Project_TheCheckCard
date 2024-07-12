const { Comment, User } = require('../models');

// 모든 댓글 조회
exports.showComments = async (req, res) => {
  const allComments = await Comment.findAll({
    //옵션 사용해서 User-nickname 가져오기 
    include: [{
      model: User,
      attributes: ['nickname'],
    }],
  });
  // req.user : 현재 로그인된 사용자 > { userId: 2, iat: 1720768471, exp: 1720772071 }
  // res.render('comment', { comments: allComments, user: req.user });
  // console.log('asksksk',allComments);
  console.log('이게 무어ㅑ', allComments.User);
  res.render('comment', { comments: allComments, user: req.user });
  
};

// 댓글 생성
exports.addComment = async (req, res) => {
  if (!req.user) { // -- token -- //
    // fetch 요청에 실패했을 때 반환되는 상태코드 및 메시지
    return res.status(401).json({ message: '현재 로그인된 유저 없음' });
  }

  const { comment_contents } = req.body;
  const newComment = {
    comment_contents,
    userid: req.user.userId, // -- token -- // : 토큰에 있는 현재 사용자 ID
  };
  // 데이터베이스에 새로운 댓글 저장 
  const createdComment = await Comment.create(newComment);
  // 댓글id(PK값)로 생성한 댓글 조회 > nickname 속성 함께 가져옴 
  const fullComment = await Comment.findByPk(createdComment.comment_id, {
    include: [{
      model: User,
      attributes: ['nickname'],
    }]
  });
  res.status(201).json(fullComment);
};

// 댓글 수정 
exports.editComment = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: '현재 로그인된 유저 없음' });
  }

  // URL매개변수(req.params)에서 댓글id 추출(route에서 URL에 id 전송함)
  const { id } = req.params;
  const { comment_contents } = req.body;
  // URL매개변수에서 찾은 id로 데이터베이스 조회
  const comment = await Comment.findByPk(id);

  // 조회한 댓글 작성자와 현재 사용자 ID값 비교  > 검증 
  if (comment.userid !== req.user.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  // 댓글 내용 업데이트
  comment.comment_contents = comment_contents;
  // 데이터베이스 저장 
  await comment.save();
  res.status(200).json(comment);
};

// 댓글 삭제 
exports.deleteComment = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: '현재 로그인된 유저 없음' });
  }

  const { id } = req.params;
  const comment = await Comment.findByPk(id);

  if (comment.userid !== req.user.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await comment.destroy();
  res.status(200).json({ message: '삭제 완료' });
};
