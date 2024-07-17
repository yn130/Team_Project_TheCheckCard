const { Card } = require('../models'); // 데이터베이스 모델

exports.getCardDetails = async (req, res) => {
    try {
      const cards = await Card.findAll();
      res.render('search', { cards });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };