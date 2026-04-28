import swaggerUi from "swagger-ui-express";
import YAML from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT: actually READ the file
const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, "../../docs/openapi.yaml"), "utf8")
);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;