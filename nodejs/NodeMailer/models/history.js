"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      send_to: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      message: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "History",
      tableName: "histories",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return History;
};
