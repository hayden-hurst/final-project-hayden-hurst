import express from "express";
import cors from "cors";
import "dotenv/config";

import setupSwagger from "./config/swagger.js";

import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import financialRecordRoutes from "./routes/financialRecordRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/financial-records", financialRecordRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});