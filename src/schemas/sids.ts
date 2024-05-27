import z from "zod";

export const sidPrefix = z.enum([
  "AC",
  "CA",
  "IS",
  "CF",
  "CH",
  "MB",
  "FW",
  "FN",
  "FT",
  "IM",
  "MG",
  "RE",
  "ET",
  "ES",
  "MP",
  "TO",
  "TZ",
  "WT",
  "WA",
  "TC",
  "WK",
  "WR",
  "WW",
  "WS",
  "WQ",
]);

export type SIDPrefix = z.infer<typeof sidPrefix>;

const sidLength = { len: 34, message: "SID must be 34 characters in length" };

const sidRegex = (prefix: SIDPrefix) => {
  return new RegExp(`${prefix}[a-fA-F0-9]{32}`);
};
const invalidSidRegexMessage = "Invalid SID pattern";

export const account = z
  .string()
  .startsWith("AC", "Account SID must start with AC")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("AC"), invalidSidRegexMessage);

export const call = z
  .string()
  .startsWith("CA", "Call SID must start with CA")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("CA"), invalidSidRegexMessage);

export const chatService = z
  .string()
  .startsWith("IS", "Chat Service SID must start with IS")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("IS"), invalidSidRegexMessage);

export const conference = z
  .string()
  .startsWith("CF", "Conference SID must start with CF")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("CF"), invalidSidRegexMessage);

export const conversation = z
  .string()
  .startsWith("CH", "Conversation SID must start with CH")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("CH"), invalidSidRegexMessage);

export const conversationParticipant = z
  .string()
  .startsWith("MB", "Conversation Participant SID must start with MB")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("MB"), invalidSidRegexMessage);

export const flow = z
  .string()
  .startsWith("FW", "Flow SID must start with FW")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("FW"), invalidSidRegexMessage);

export const flowExecution = z
  .string()
  .startsWith("FN", "Flow execution SID must start with FN")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("FN"), invalidSidRegexMessage);

export const flowStep = z
  .string()
  .startsWith("FT", "Flow step SID must start with FT")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("FT"), invalidSidRegexMessage);

export const message = z
  .string()
  .startsWith("IM", "Message SID must start with IM")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("IM"), invalidSidRegexMessage);

export const messagingService = z
  .string()
  .startsWith("MG", "Messaging Service SID must start with MG")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("MG"), invalidSidRegexMessage);

export const recording = z
  .string()
  .startsWith("RE", "Recording SID must start with RE")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("RE"), invalidSidRegexMessage);

export const syncService = z
  .string()
  .startsWith("IS", "Sync service SID must start with IS")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("IS"), invalidSidRegexMessage);

export const syncDocument = z
  .string()
  .startsWith("ET", "Sync Document SID must start with ET")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("ET"), invalidSidRegexMessage);

export const syncList = z
  .string()
  .startsWith("ES", "Sync List SID must start with ES")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("ES"), invalidSidRegexMessage);

export const syncMap = z
  .string()
  .startsWith("MP", "Sync Map SID must start with MP")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("MP"), invalidSidRegexMessage);

export const syncStream = z
  .string()
  .startsWith("TO", "Sync Stream SID must start with TO")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("TO"), invalidSidRegexMessage);

export const syncStreamMessage = z
  .string()
  .startsWith("TZ", "Sync Stream Message SID must start with TZ")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("TZ"), invalidSidRegexMessage);

export const task = z
  .string()
  .startsWith("WT", "Task SID must start with WT")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("WT"), invalidSidRegexMessage);

export const taskRouterActivity = z
  .string()
  .startsWith("WA", "TaskRouter Activity SID must start with WA")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("WA"), invalidSidRegexMessage);

export const taskRouterTaskChannel = z
  .string()
  .startsWith("TC", "TaskRouter Task Channel SID must start with TC")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("TC"), invalidSidRegexMessage);

export const taskRouterWorker = z
  .string()
  .startsWith("WK", "TaskRouter Worker SID must start with WK")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("WK"), invalidSidRegexMessage);

export const taskRouterWorkerReservation = z
  .string()
  .startsWith("WR", "TaskRouter Worker Reservation SID must start with WR")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("WR"), invalidSidRegexMessage);

export const taskRouterWorkflow = z
  .string()
  .startsWith("WW", "TaskRouter Workflow SID must start with WW")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("WW"), invalidSidRegexMessage);

export const taskRouterWorkspace = z
  .string()
  .startsWith("WS", "TaskRouter Workspace SID must start with WS")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("WS"), invalidSidRegexMessage);

export const taskRouterQueue = z
  .string()
  .startsWith("WQ", "TaskRouter Queue SID must start with WQ")
  .length(sidLength.len, sidLength.message)
  .regex(sidRegex("WQ"), invalidSidRegexMessage);
