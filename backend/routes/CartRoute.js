import express from 'express'
import { addToCart,removefromCart,getCart } from '../controllers/CartController.js'
import authMiddleware from '../models/Auth.js';

const CartRouter = express.Router();

   CartRouter.post("/add", authMiddleware,addToCart);
   CartRouter.post("/remove", authMiddleware,removefromCart);
   CartRouter.post("/get", authMiddleware,getCart);


   export default CartRouter;