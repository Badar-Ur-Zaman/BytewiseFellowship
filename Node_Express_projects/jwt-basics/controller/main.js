import jwt from "jsonwebtoken";
import CustomAPIError from "../errors/custom-error.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  console.log(`Username: ${username}, Password: ${password}`);
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token });
};

export const dashboard = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: `Hey ${req.user.username}`,
      secret: `Your Secret Data is: ${randomNumber}`,
    });
};
