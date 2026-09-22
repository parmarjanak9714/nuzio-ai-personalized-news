import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import preferenceRoutes from "./routes/preferenceRoutes";
import newsRoutes from "./routes/newsRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/news", newsRoutes);


app.get("/", (req, res) =>{
    res.send("Nuzio AI Backend is running");
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

