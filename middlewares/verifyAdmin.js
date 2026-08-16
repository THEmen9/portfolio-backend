import jwt from "jsonwebtoken";

//-------- middleware for admin-----------//
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });
  
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next(); // if all ok then approve next
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyAdmin;