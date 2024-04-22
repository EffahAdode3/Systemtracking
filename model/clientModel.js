
import sequelize from "../db/dbConfig.js";
import DataType from "sequelize";
const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
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
   
   company:{
    type:DataType.STRING,
    allowNull:false,
   }
  },
  { timestamps: true }
);

export default Client;
