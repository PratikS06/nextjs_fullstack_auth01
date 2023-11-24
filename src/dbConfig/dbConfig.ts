import mongoose from "mongoose";

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Mongooes Connected Successfully");
            
        })

    } catch (error) {
        console.log("Something Goes Wrong!!!")
        console.log(error);
        
    }
}