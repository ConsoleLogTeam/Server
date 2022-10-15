import mongoose from "mongoose";

export async function initializeMongoose() {
    try {
        await mongoose.connect(process.env.DATABASE as string);
    } catch (error) {
        console.log(error);
    }
}
