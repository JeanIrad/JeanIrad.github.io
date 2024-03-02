import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: `${__dirname}/env/config.env` });

import app from "./index";

const PORT = process.env.PORT || 6000;
const DB_LOCAL: string = process.env.DB_LOCAL || "";
const DB: string = process.env.DB || "";

mongoose
  .connect(DB_LOCAL)
  .then(() => console.log("DB connected!"))
  .catch((e) => console.log("error!", e));

app.listen(PORT, () => console.log(`app running on port ${PORT}... `));
