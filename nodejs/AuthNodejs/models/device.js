"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
    }
  }
  Device.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      browser: DataTypes.STRING,
      system: DataTypes.STRING,
      login_time: DataTypes.DATE,
      active_time: DataTypes.DATE,
      src: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Device",
      tableName: "devices",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Device;
};
