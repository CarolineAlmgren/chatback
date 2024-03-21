
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chatUser extends Model {
  
    static associate(models) {
     
    }
  }
  chatUser.init({
    Username: DataTypes.STRING,
    password:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chatUser',
  });
  return chatUser;
};