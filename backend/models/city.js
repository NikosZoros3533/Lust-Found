import mongoose from "mongoose";

const citySchema = new mongoose.Schema({}, { collection: "cities" }); // Empty schema, since we're only reading

const City = mongoose.model("City", citySchema);

export default City;

