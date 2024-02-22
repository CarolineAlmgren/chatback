
'use strict';
const {
  Model
} = require('sequelize');
const chatUser = require('./chatUser')
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({chatUser}) {
        this.belongsTo(chatUser, { foreignKey: 'chatUserId', as: 'chatUser' })
        // define association here
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