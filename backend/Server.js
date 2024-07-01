import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodrouter from './routes/Foodroute.js';
import userRouter from './routes/UserRoutes.js';
import 'dotenv/config'
import CartRouter from './routes/CartRoute.js';
import orderRouter from './routes/OrderRoute.js';
// app config
const app = express();
const port = process.env.PORT || 4000


//middleware 
app.use(express.json());
 app.use(cors());

// Db connection
  connectDB();

  // api endpoint
  app.use("/api/food",foodrouter);
  app.use("/images",express.static("uploads"));
  app.use("/api/user",userRouter)
  app.use("/api/cart",CartRouter)
  app.use("/api/order",orderRouter)

 app.get("/",(req,res)=>{
      res.send("Api working")
 })

 app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
 })

