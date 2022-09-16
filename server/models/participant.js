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
      Participant.belongsTo(models.Team)
      Participant.belongsTo(models.Event)
    }
  }
  Participant.init({
    TeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Team is required"
        },
        notEmpty: {
          msg: "Team is required"
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
    statusPay: {
      type: DataTypes.STRING,
      defaultValue: "Unpaid",
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date is required"
        },
        notEmpty: {
          msg: "Date is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};