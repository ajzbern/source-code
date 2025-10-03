import { Router } from "express";

const statusRouter = Router();

statusRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Status retrieved successfully",
    data: {
      status: "Running",
    },
  });
});

export default statusRouter;
