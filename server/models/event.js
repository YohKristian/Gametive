"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Event.belongsTo(models.User);
			Event.hasMany(models.Participant);
			Event.belongsTo(models.Game);
			Event.belongsTo(models.Location);
		}
	}
	Event.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Event is required",
					},
					notEmpty: {
						msg: "Event is required",
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Description is required",
					},
					notEmpty: {
						msg: "Description is required",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Price is required",
					},
					notEmpty: {
						msg: "Price is required",
					},
					min: {
						args: [0],
						msg: "Price minimum is 0",
					},
				},
			},
			rules: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Rules is required",
					},
					notEmpty: {
						msg: "Rules is required",
					},
				},
			},
			size: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					notNull: {
						msg: "Size is required",
					},
					notEmpty: {
						msg: "Size is required",
					},
				},
			},
			eventStatus: {
				type: DataTypes.STRING,
				defaultValue: "Pending",
			},
			eventPoster: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Poster is required",
					},
					notEmpty: {
						msg: "Poster is required",
					},
				},
			},
			eventDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Start Date is required",
					},
					notEmpty: {
						msg: "Start Date is required",
					},
				},
			},
			eventType: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Event Type is required",
					},
					notEmpty: {
						msg: "Event Type is required",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "User is required",
					},
					notEmpty: {
						msg: "User is required",
					},
				},
			},
			GameId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Game is required",
					},
					notEmpty: {
						msg: "Game is required",
					},
				},
			},
			LocationId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Location is required",
					},
					notEmpty: {
						msg: "Location is required",
					},
				},
			},
			Bracket: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Event",
		},
	);
	return Event;
};
