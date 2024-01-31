"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShortenUrl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShortenUrl.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
    }
  }
  ShortenUrl.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      new_link: DataTypes.STRING,
      root_link: DataTypes.STRING,
      password: DataTypes.STRING,
      clicks: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      check: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ShortenUrl",
      tableName: "shorten_urls",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return ShortenUrl;
};
