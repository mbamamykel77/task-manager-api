import dotenv from "dotenv";
dotenv.config();

export const connectDB =  {
    mongodb_connection_url: process.env.MongoURI,
}
