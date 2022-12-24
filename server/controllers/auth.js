import { hash, compare } from "bcrypt";
import auth from "../models/auth.js";
import jwt from "jsonwebtoken";

// GET Apis
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check for existing user
    const existingUser = await auth.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash Password
    const hashedPassword = await hash(password, 10);

    const result = await auth.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "USERDATA");
    res.status(201).json({ user: result, token: token });
  } catch (er) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await auth.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const matchPassword = await compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "USERDATA"
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};
