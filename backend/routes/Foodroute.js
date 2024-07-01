import express from 'express'
import { addfood, listFood, removeFood } from '../controllers/Foodcontroler.js';
import multer from 'multer';

const foodrouter = express.Router();

// image storage Engine

 const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
 })

 const upload = multer({storage:storage})


foodrouter.post('/add',upload.single("image"),addfood)

foodrouter.get("/list",listFood)
foodrouter.post("/remove",removeFood);










export default foodrouter;
