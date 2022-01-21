const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { getCoordinates } = require("../utils/geoLocationHelper");

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    worker_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "worker",
        key: "id",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time_availability: {
      type: DataTypes.STRING, // is it ok to have time availability in string
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING, // how to make a dropdown list????
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        if (!newUserData.latitude) {
          const address = `${newUserData.address}, ${newUserData.city}, ${newUserData.country}, ${newUserData.zip_code}`;
          const { lat, lng } = await getCoordinates(address);
          console.log(
            `Addres: ${address} Longitude : ${lng} Lattitude: ${lat}`
          );
          newUserData.longitude = lng;
          newUserData.latitude = lat;
        }
        return newUserData;
      },
      beforeUpdate: async (newUserData) => {
        console.log("********Lat", newUserData.latitude);
        if (!newUserData.latitude) {
          const address = `${newUserData.address}, ${newUserData.city}, ${newUserData.country}, ${newUserData.zip_code}`;
          const { lat, lng } = await getCoordinates(address);
          newUserData.longitude = lng;
          newUserData.latitude = lat;
        }
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Contact",
  }
);

module.exports = Contact;
