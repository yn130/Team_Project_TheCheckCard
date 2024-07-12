const { Sequelize } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
const db = {};

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
);

// 모델 불러오기
const User = require('./User')(sequelize, Sequelize); 
const Comment = require('./Comment')(sequelize, Sequelize); 


// 모델간 관계 연결 
User.hasMany(Comment, {
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE',
  foreignKey: 'userid',
  sourceKey: 'id'
});
Comment.belongsTo(User, {
  foreignKey: 'userid',
  targetKey: 'id'
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;

module.exports = db;

