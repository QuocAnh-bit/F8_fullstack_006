"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Provider, {
        foreignKey: "provider_id",
        as: "provider",
      });

      //
      User.belongsToMany(models.Role, {
        through: "user_role",
        foreignKey: "user_id",
        as: "roles",
      });

      User.belongsToMany(models.Permission, {
        through: "users_permissions",
        foreignKey: "user_id",
        as: "permissions",
      });

      User.hasOne(models.ShortenUrl, {
        foreignKey: "user_id",
        as: "shortenUrls",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      provider_id: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      access_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
