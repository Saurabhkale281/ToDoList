import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
    const MONGODB_URI = `mongodb+srv://kalesaurabh281:c606w7oImjgk0II6@cluster0.a9mfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    
    try{
        console.log('Database connected successfully');
    }
    catch(error){
        console.log('Error while connecting with the database',error.message);
    };

    mongoose.connection.on('connected', () => {
        console.log('Database connected Successfully');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
    });

    mongoose.connection.on('error', (error) => {
        console.log('Error while connecting with the database ', error.message);
    });
};

export default Connection;