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
      Game.hasMany(models.Event)
    }
  }
  Game.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        },
      }
    },
    gameImg: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image Url is required"
        },
        notEmpty: {
          msg: "Image Url is required"
        },
      }
    },
    youtubeUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Youtube Url is required"
        },
        notEmpty: {
          msg: "Youtube Url is required"
        },
      }
    },
    gameUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Game Url is required"
        },
        notEmpty: {
          msg: "Game Url is required"
        },
      }
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Release Date is required"
        },
        notEmpty: {
          msg: "Release Date is required"
        },
      }
    },
    developer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Developer is required"
        },
        notEmpty: {
          msg: "Developer is required"
        },
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};