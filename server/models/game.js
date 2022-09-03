'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    name: DataTypes.STRING,
    gameImg: DataTypes.TEXT,
    youtubeUrl: DataTypes.TEXT,
    gameUrl: DataTypes.TEXT,
    releaseDate: DataTypes.DATE,
    developer: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};