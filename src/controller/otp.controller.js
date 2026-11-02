import admin from "../config/admin.js";
import User from "../model/user.model.js";

export const firebaseSignup = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // Firebase token backend par verify hoga
    const decoded = await admin.auth().verifyIdToken(token);

    const phone = decoded.phone_number;
    const firebaseUid = decoded.uid;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number not found",
      });
    }

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      {
        $set: {
          phone,
          verified: true,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Signup successful",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      message: "Firebase authentication failed",
    });
  }
};