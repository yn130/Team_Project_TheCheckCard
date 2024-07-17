const { CommentLike, Comment, User } = require('../models');

// 좋아요 토글
exports.toggleLike = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: '현재 로그인된 유저 없음' });
  }

  const { comment_id } = req.body;
  const user_id = req.user.userId;

  try {
    // 좋아요 여부 확인
    const existingLike = await CommentLike.findOne({
      where: { comment_id, user_id }
    });

    if (existingLike) {
      // 좋아요 취소
      await existingLike.destroy();
      const likeCount = await CommentLike.count({ where: { comment_id } });
      return res.status(200).json({ message: '좋아요 취소', liked: false, likeCount });
    } else {
      // 좋아요 추가
      await CommentLike.create({ comment_id, user_id });
      const likeCount = await CommentLike.count({ where: { comment_id } });
      return res.status(200).json({ message: '좋아요 추가', liked: true, likeCount });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// 모든 댓글 조회
exports.showComments = async (req, res) => {
    const cardId = req.query.card_id; // 카드 ID를 쿼리에서 가져옴
    const page = parseInt(req.query.page) || 1; // 요청된 페이지 번호(프론트에서 주어진 query의 페이지 / 없으면 1로 지정)
    const limit = 10; // 페이지에 보여줄 댓글 갯수 (10개)
    const offset = (page - 1) * limit; // 뛰어넘는개수 페이지가 ex) pg 2 = 10이되어 뛰어넘는다.
    
    try {
        const { count, rows } = await Comment.findAndCountAll({
            where: { card_id: cardId }, // 해당 카드에 대한 댓글만 가져옴
            include: [{
                model: User,
                attributes: ['nickname'],
            }],
            limit,
            offset,
            order: [['createdAt', 'DESC']], // 댓글생성날짜를 기준으로 내림차순으로 정렬
        });
        const totalPages = Math.ceil(count / limit);
        res.render('comment', {
            comments: rows,
            currentPage: page,
            totalPages: totalPages,
            user: req.user,
            cardId: cardId // 카드 ID를 템플릿으로 전달
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Internal Server Error');
    }
};

// 댓글 생성
exports.addComment = async (req, res) => {
  if (!req.user) { // -- token -- //
    return res.status(401).json({ message: '현재 로그인된 유저 없음' });
  }

  const { comment_contents, card_id } = req.body;
  const newComment = {
    comment_contents,
    userid: req.user.userId,
    card_id: card_id // 카드 ID를 함께 저장
  };

  try {
    const createdComment = await Comment.create(newComment);
    const fullComment = await Comment.findByPk(createdComment.comment_id, {
      include: [{
        model: User,
        attributes: ['nickname'],
      }]
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).send('Internal Server Error');
  }
};

// 댓글 수정
exports.editComment = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: '현재 로그인된 유저 없음' });
  }

  const { id } = req.params;
  const { comment_contents } = req.body;
  const comment = await Comment.findByPk(id);

  if (comment.userid !== req.user.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  comment.comment_contents = comment_contents;
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