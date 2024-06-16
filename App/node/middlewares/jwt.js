// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  // Verificar si existe el token en el header
  // split " " y quedarse el segundo elemento
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
