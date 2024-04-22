
import sequelize from "../db/dbConfig.js";
import DataType from "sequelize";
import Client from "./clientModel.js";
const Shipment = sequelize.define(
  "shipment",
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    tracking_Number: {
      type: DataType.STRING,
      allowNull: false,
    },
  
    item_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    statuses: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Shipment;
Shipment.belongsTo(Client,{foreignKey: 'client_id'});
Client.hasMany(Shipment,{foreignKey:'client_id'});