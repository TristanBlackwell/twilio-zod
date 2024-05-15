import z, { ZodRawShape } from "zod";

import { stringToJson } from "../../json";

export const taskChannelName = z
  .enum(["default", "voice", "chat", "email", "sms", "video"])
  .describe("The channel which the task has come in on");

const attributess = z
  .object({
    from: z.string().describe("The address which the call originated from"),
    direction: z.enum(["inbound", "outbound"]).describe("Direction of the task"),
    conversations: z
      .object({
        initiated_by: z.string().optional(),
        conversation_id: z.string().optional(),
        external_contact: z.string().optional(),
        conversation_attribute_1: z.string().optional(),
        conversation_attribute_2: z.string().optional(),
        conversation_attribute_3: z.string().optional(),
        conversation_attribute_4: z.string().optional(),
        conversation_attribute_5: z.string().optional(),
        conversation_attribute_6: z.string().optional(),
        conversation_attribute_7: z.string().optional(),
        conversation_attribute_8: z.string().optional(),
        conversation_attribute_9: z.string().optional(),
        conversation_attribute_10: z.string().optional(),
      })
      .passthrough()
      .optional(),
    customers: z
      .object({
        phone: z.string().optional(),
        name: z.string().optional(),
        external_id: z.string().optional(),
        external_contact: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const taskAttributes = attributess.or(stringToJson.pipe(attributess));

export const extendTaskAttributes = (initial: ZodRawShape, extension: ZodRawShape) => {
  let extendedSchema = attributess.extend(extension);
  return extendedSchema.or(stringToJson.pipe(extendedSchema));
};

export type TaskChannelName = z.infer<typeof taskChannelName>;
export type TaskAttributes = z.infer<typeof taskAttributes>;
