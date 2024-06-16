import cors from "cors";

const corsOptions = {
  origin: "*", // Configura esto según tus necesidades
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
