import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => console.log('connect to mongodb')).catch(error => console.log(error));
    console.log(`server running on port : ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal Sever Error";

    res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage
    });
});