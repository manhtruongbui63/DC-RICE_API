'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {}
  }
  Post.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      author: DataTypes.STRING,
      content: DataTypes.TEXT('long'),
      status: DataTypes.ENUM('active', 'pending', 'inactive')
    },
    {
      sequelize,
      modelName: 'Post'
    }
  )
  return Post
}
