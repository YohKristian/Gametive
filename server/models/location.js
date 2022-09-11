"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Location extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Location.hasOne(models.Event);
		}
	}
	Location.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Address is required",
					},
					notEmpty: {
						msg: "Address is required",
					},
				},
			},
			ProvinceId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Province is required",
					},
					notEmpty: {
						msg: "Province is required",
					},
				},
			},
			RegencyId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Regency is required",
					},
					notEmpty: {
						msg: "Regency is required",
					},
				},
			},
			DistrictId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "District is required",
					},
					notEmpty: {
						msg: "District is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Location",
		},
	);
	return Location;
};
