import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  const { nickname } = req.params;
  try {
    const user = await User.findOne({ nickname }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getUserProfile", error.message);
  }
};

export const updateUserProfile = async (req, res) => {
  const {
    nickname,
    email,
    currentPassword,
    newPassword,
    gender,
    city,
    selfDescription,
    targetDescriptions,
  } = req.body;

  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }
      if (newPassword === currentPassword) {
        res
          .status(400)
          .json({ error: "New password is same with the current password" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    if (nickname) {
      const existingUser = await User.findOne({ nickname });
      if (existingUser) {
        return res.status(400).json({ error: "Nickname already exists" });
      }
    }
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Nickname already exists" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
    }
    user.nickname = nickname || user.nickname;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.city = city || user.city;
    user.selfDescription = selfDescription || user.selfDescription;
    user.targetDescriptions = targetDescriptions || user.targetDescriptions;

    user = await user.save();
    user.password = null;
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {};

// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//       res.status(404).json({ message: "User does not exist" });
//     }
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // export const createUserProfile = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const user = await User.findByIdAndUpdate(id, req.body);
// //     if(!user){
// //       res.status(404).json({message:"User does not exist"})
// //     }

// //     res.status(201).json(user);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, req.body);
//     if (!user) {
//       res.status(404).json({ message: "User does not exist" });
//     }
//     const updatedUser = await User.findById(id);
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       res.status(404).json({ message: "User does not exist" });
//     }
//     res.status(200).json({ message: "User has been deleted Succesfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
