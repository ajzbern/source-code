import { Request, Response } from "express";
import { saveRecordingService } from "../services/recording.service";

interface RecordingRequest {
  end_time: string;
  filename: string;
  session_id: string;
  start_time: string;
  url: string;
  call_id: string;
}

export const saveRecordingController = async (req: Request, res: Response) => {
  try {
    const { recordings } = req.body as { recordings: RecordingRequest[] };
    if (!recordings || !Array.isArray(recordings) || recordings.length === 0) {
      return res.status(400).json({ error: "Recordings are required" });
    }
    const respose = await saveRecordingService(recordings);
    return res.status(200).json(respose);
  } catch (error) {
    return res.status(400).json({ error: "Invalid request body" });
  }
};
