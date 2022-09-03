'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    rules: DataTypes.TEXT,
    eventStatus: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventType: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};