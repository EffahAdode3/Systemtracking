import express from "express"
import bodyParser from "body-parser"
import  sequelize  from "./db/dbConfig.js"
import cors from 'cors'
import dotenv from "dotenv";
import Admin from "./routes/adminRoute.js"
import Client from "./routes/clientRoute.js"
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 4000;
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/', Admin)
app.use('/client', Client)
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
        console.log(`App is running on ${port}`);
      });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  (async () => {
    await sequelize.sync();
  })();
