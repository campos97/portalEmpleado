import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Verificar si existe el token en el header
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access denied" });
  }

  // Obtener el token y verificarlo
  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    return res.status(400).json({ message: "Invalid token" });
  }
};
