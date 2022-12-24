import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorised user" });
    }
    token = token.split(" ")[1];
    let user = jwt.verify(token, "USERDATA");
    req.userId = user.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorised user" });
  }
};

export default auth;
