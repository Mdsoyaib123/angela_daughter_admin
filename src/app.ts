import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/global_error_handler";
import notFound from "./app/middlewares/not_found_api";
import appRouter from "./routes";
import { configs } from "./app/configs";
import bcrypt from "bcrypt";
import cron from "node-cron";
import { User } from "./app/modules/user/user.model";

const app = express();

// middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://kennedi-harris.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, origin); // Reflect (echo) the exact Origin value
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // add more if you use custom headers
  }),
);
app.use(express.json({ limit: "100mb" }));
app.use(express.raw());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", appRouter);

// stating point
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is running successful !!",
    data: null,
  });
});

export const createDefaultSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: "angela_daughter@gmail.com",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        "admin@123",
        Number(configs.bcrypt_salt_rounds),
      );

      await User.create({
        name: "Angela Daugher",
        email: "angela_daughter@gmail.com",
        password: hashedPassword

      });
      console.log("✅ Default Admin created.");
    } else {
      console.log("ℹ️ Admin already exists.");
    }
  } catch (error) {
    console.log("❌ Failed to create default admin:", error);
  }
};

createDefaultSuperAdmin();


// global error handler


app.use(globalErrorHandler);
app.use(notFound);

// export app
export default app;
