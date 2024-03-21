
'use strict';
const {
  Model
} = require('sequelize');
const chatUser = require('./chatUser')
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
   
    static associate({chatUser}) {
        this.belongsTo(chatUser, { foreignKey: 'chatUserId', as: 'chatUser' })
        
      }
  }
  message.init({
    message:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};