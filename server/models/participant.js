'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.User)
      Participant.belongsTo(models.Event)
    }
  }
  Participant.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User is required"
        },
        notEmpty: {
          msg: "User is required"
        },
      }
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Event is required"
        },
        notEmpty: {
          msg: "Event is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};