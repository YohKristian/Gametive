"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User, { foreignKey: 'CaptainName', targetKey: 'username' });
      Team.hasMany(models.Participant);
    }
  }
  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Team name is required",
          },
          notEmpty: {
            msg: "Team name is required",
          },
        },
      },
      CaptainName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Captain name is required",
          },
          notEmpty: {
            msg: "Captain name is required",
          },
        },
      },
      MemberName1: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      MemberName2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      MemberName3: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      MemberName4: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      BenchMemberName1: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      BenchMemberName2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      statusTeam: {
        allowNull: true,
        defaultValue: "Active",
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
