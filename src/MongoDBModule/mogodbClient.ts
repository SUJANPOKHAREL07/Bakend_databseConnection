import mongoose, { Mongoose } from "mongoose";


const url = process.env.MONGO_URL;
mongoose.connect(
  "mongodb+srv://officialsuzan247:suzan@cluster0.t2dyhzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Conection Refused", err);
});
db.once("open", function () {
  console.log("Connected to MongoDB!");
});
export default mongoose;