// end_time
// filename
// session_id
// start_time
// url
// call_id

import { Router } from "express";
import { asyncHandler } from "../../utils/route_wrapper";
import { saveRecordingController } from "../../controllers/recording.controller";

const recordingsRouter = Router();

recordingsRouter.post("/save-recording", asyncHandler(saveRecordingController));

export default recordingsRouter;