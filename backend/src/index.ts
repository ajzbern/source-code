import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error_handler";
import cookieParser from "cookie-parser";
import cors from "cors";
import { checkAgentServer } from "./services/agent.service";

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:8000",
      "*",
    ],
    // origin: ["https://taskpilot.xyz", "https://nexus.taskpilot.xyz"],
    // origin:["localhost"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandler);

app.listen(process.env.PORT || 8000, async () => {
  console.log("Checking Agent Server..");
  // var agent: any = await checkAgentServer();
  // if (agent.message === "Welcome to the AgentX Service!") {
  //   console.log(`Agent Server running`);
  // }
  console.log(`Started backend server on port ${process.env.PORT}`);
});

export default app;
