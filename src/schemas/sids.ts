import z from "zod";

export const account = z
  .string()
  .startsWith("AC", "Account SID must start with AC")
  .length(34, "SID must be 34 characters in length")
  .regex(/^AC[a-fA-F0-9]+$/, "Invalid SID pattern");

export const chatService = z
  .string()
  .startsWith("IS", "Chat Service SID must start with IS")
  .length(34, "SID must be 34 characters in length")
  .regex(/^IS[a-fA-F0-9]+$/, "Invalid SID pattern");

export const conversation = z
  .string()
  .startsWith("CH", "Conversation SID must start with CH")
  .length(34, "SID must be 34 characters in length")
  .regex(/^CH[a-fA-F0-9]+$/, "Invalid SID pattern");

export const messagingService = z
  .string()
  .startsWith("MG", "Messaging Service SID must start with MG")
  .length(34, "SID must be 34 characters in length")
  .regex(/^CH[a-fA-F0-9]+$/, "Invalid SID pattern");

export const task = z
  .string()
  .startsWith("WT", "Task SID must start with WT")
  .length(34, "SID must be 34 characters in length")
  .regex(/^WT[a-fA-F0-9]+$/, "Invalid SID pattern");

export const taskRouterWorkspace = z
  .string()
  .startsWith("WS", "TaskRouter Workspace SID must start with WS")
  .length(34, "SID must be 34 characters in length")
  .regex(/^WT[a-fA-F0-9]+$/, "Invalid SID pattern");
