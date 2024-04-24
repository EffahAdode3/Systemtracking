import  sequelize  from "sequelize";
import dotenv from 'dotenv'
dotenv.config()
const Sequelize = new sequelize(
    process.env.DB_Name,
    process.env.USER_NAME,
    process.env.PASSWORD,
    
     {
    host: bipkuxtelwhd2jvzkyor-mysql.services.clever-cloud.com,
    dialect:"mysql", 
    logging:true,
    port: 3306
});

export default Sequelize