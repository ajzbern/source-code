import prisma from "../db";

interface RecordingRequest {
  end_time: string;
  filename: string;
  session_id: string;
  start_time: string;
  url: string;
  call_id: string;
}

export const saveRecordingService = async (recordings: RecordingRequest[]) => {
  // Validate the request body
  if (!recordings || !Array.isArray(recordings) || recordings.length === 0) {
    throw new Error("Recordings are required");
  }

  // Validate each recording object
  for (const recording of recordings) {
    if (
      !recording.end_time ||
      !recording.filename ||
      !recording.session_id ||
      !recording.start_time ||
      !recording.url ||
      !recording.call_id
    ) {
      throw new Error("All fields are required");
    }
  }

  // Track results of operations
  const results = {
    saved: 0,
    skipped: 0,
    errors: 0,
  };

  // Process each recording
  for (const recording of recordings) {
    try {
      // Check if a recording with the same filename already exists
      const existingRecording = await prisma.recordings.findFirst({
        where: {
          fileName: recording.filename,
        },
      });

      // If the recording doesn't exist, save it
      if (!existingRecording) {
        await prisma.recordings.create({
          data: {
            startTime: new Date(recording.start_time),
            endTime: new Date(recording.end_time),
            url: recording.url,
            callId: recording.call_id,
            sessionId: recording.session_id,
            fileName: recording.filename,
          },
        });
        results.saved++;
      } else {
        // Skip this recording as it already exists
        results.skipped++;
      }
    } catch (error) {
      console.error(`Error processing recording ${recording.filename}:`, error);
      results.errors++;
    }
  }

  // Return a success message with results
  return {
    message: "Recording processing completed",
    results: {
      totalProcessed: recordings.length,
      saved: results.saved,
      skipped: results.skipped,
      errors: results.errors,
    },
  };
};