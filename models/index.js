const User = require('./User');
const Tweet = require('./Tweet');
const Comment = require('./Comment');
const PotatoOrPitbull = require('./PotatoOrPitbull');

User.hasMany(Tweet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Tweet.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Tweet, {
  foreignKey: 'tweet_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Tweet.hasMany(Comment, {
  foreignKey: 'tweet_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Tweet, Comment, PotatoOrPitbull };
