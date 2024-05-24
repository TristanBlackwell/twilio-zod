import z from "zod";

const sidLength = { len: 34, message: "SID must be 34 characters in length" };

const sidRegex = {
  pattern: /^[A-Z][A-Z][a-fA-F0-9]+$/,
  message: "Invalid SID pattern",
};

export const account = z
  .string()
  .startsWith("AC", "Account SID must start with AC")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const call = z
  .string()
  .startsWith("CA", "Call SID must start with CA")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const chatService = z
  .string()
  .startsWith("IS", "Chat Service SID must start with IS")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const conference = z
  .string()
  .startsWith("CF", "Conference SID must start with CF")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const conversation = z
  .string()
  .startsWith("CH", "Conversation SID must start with CH")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const conversationParticipant = z
  .string()
  .startsWith("MB", "Conversation Participant SID must start with MB")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const flow = z
  .string()
  .startsWith("FW", "Flow SID must start with FW")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const flowExecution = z
  .string()
  .startsWith("FN", "Flow execution SID must start with FN")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const flowStep = z
  .string()
  .startsWith("FT", "Flow step SID must start with FT")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const message = z
  .string()
  .startsWith("IM", "Message SID must start with IM")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const messagingService = z
  .string()
  .startsWith("MG", "Messaging Service SID must start with MG")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const recording = z
  .string()
  .startsWith("RE", "Recording SID must start with RE")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const syncService = z
  .string()
  .startsWith("IS", "Sync service SID must start with IS")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const syncDocument = z
  .string()
  .startsWith("ET", "Sync Document SID must start with ET")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const syncList = z
  .string()
  .startsWith("ES", "Sync List SID must start with ES")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const syncMap = z
  .string()
  .startsWith("MP", "Sync Map SID must start with MP")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const syncStream = z
  .string()
  .startsWith("TO", "Sync Stream SID must start with TO")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const syncStreamMessage = z
  .string()
  .startsWith("TZ", "Sync Stream Message SID must start with TZ")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const task = z
  .string()
  .startsWith("WT", "Task SID must start with WT")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const taskRouterActivity = z
  .string()
  .startsWith("WA", "TaskRouter Activity SID must start with WA")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const taskRouterTaskChannel = z
  .string()
  .startsWith("TC", "TaskRouter Task Channel SID must start with TC")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const taskRouterWorker = z
  .string()
  .startsWith("WK", "TaskRouter Worker SID must start with WK")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const taskRouterWorkerReservation = z
  .string()
  .startsWith("WR", "TaskRouter Worker Reservation SID must start with WR")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const taskRouterWorkflow = z
  .string()
  .startsWith("WW", "TaskRouter Workflow SID must start with WW")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const taskRouterWorkspace = z
  .string()
  .startsWith("WS", "TaskRouter Workspace SID must start with WS")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);

export const taskRouterQueue = z
  .string()
  .startsWith("WQ", "TaskRouter Queue SID must start with WQ")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex.pattern, sidRegex.message);
