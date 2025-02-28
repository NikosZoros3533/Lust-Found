import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const createUserProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, req.body);
//     if(!user){
//       res.status(404).json({message:"User does not exist"})
//     }

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json({ message: "User has been deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
