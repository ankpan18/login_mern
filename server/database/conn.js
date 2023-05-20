import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import ENV from '../config.js';

mongoose.set('strictQuery', false);
const mongod = new MongoMemoryServer();

export default async function connect(){
    const mongod=await MongoMemoryServer.create();
    const getUri=mongod.getUri();

    // const db=await mongoose.connect(getUri);
    const db=await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connected");

    return db;

}