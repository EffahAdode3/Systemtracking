import sequelize from "../db/dbConfig.js";
import DataType from "sequelize";

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataType.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
   
    phoneNumber: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Admin;
