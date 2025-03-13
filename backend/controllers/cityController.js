import City from "../models/city.js";

export const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    console.log("Error in getCities controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
