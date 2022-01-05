const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Expertise extends Model {}

Expertise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    years_experience: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    worker_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "worker",
        key: "id",
      },
    },
    certificate: {
      type: DataTypes.BOOLEAN, // why Boolean is colored differently?
      allowNull: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "expertise",
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  }
);

module.exports = Expertise;
