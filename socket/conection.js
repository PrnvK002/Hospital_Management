import mongoose from 'mongoose';
import { MONGO_URI } from './constant.js'

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`mongodb connected ${conn.connection.host}` )
    }catch(err){
        console.error(`Error on connection mongodb: ${err.message}`);
        process.exit(1);
    }
}


export default connectDB; 