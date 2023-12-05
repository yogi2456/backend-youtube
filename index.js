import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./Routes/index.js";


const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("welcome to backend")
})

app.use("/api/v2", router)

mongoose.connect(process.env.MONGOURL).then(() => console.log("Database connected."))

app.listen(8000, () => console.log("App is running on port 8000"))