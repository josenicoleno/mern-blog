import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  )
    return next(errorHandler(400, "All fields are required!"));

  if (password.length < 8 || password.length > 20 ) {
    return next(errorHandler(400, "Password must be between 8 and 20 characters long."));
  }
  if (!email.includes("@")) {
    return next(errorHandler(400, "Please enter a valid email address."));
  }
  if (username.length < 6 || username.length > 20) {
    return next(errorHandler(400, "Username must be between 6 and 20 characters long."));
  } 
  

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User/password incorrect"));
    }

    if (validUser.banned) {
      return next(errorHandler(400, "User banned"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      validUser.bannedCount += 1;
      if (validUser.bannedCount >= 5) {
        validUser.banned = true;
        await validUser.save();
        return next(errorHandler(400, "User banned"));
      }
      await validUser.save();
      return next(errorHandler(400, "User/password incorrect"));
    }

    if (!validUser.verified) {
      validUser.bannedCount += 1;
      if (validUser.bannedCount >= 5) {
        validUser.banned = true;
        await validUser.save();
        return next(errorHandler(400, "User banned"));
      }
      await validUser.save();
      return next(errorHandler(400, "User not verified"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;
    validUser.bannedCount = 0;
    await validUser.save();

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-5),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
