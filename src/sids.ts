import z from "zod";

export const conversationSidSchema = z
  .string()
  .startsWith("CH", "Conversation SID must start with CH")
  .length(34, "SID must be 34 characters in length");
