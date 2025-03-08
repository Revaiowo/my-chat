import mongoose from "mongoose";

async function connectDB(MONGO_URI: string) {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Connected to the database!");
	} catch (error) {
		console.log("Could not connect to the database.");
	}
}

export default connectDB;
