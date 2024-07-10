import z from "zod";

export const taskChannelName = z
  .enum(["default", "voice", "chat", "email", "sms", "video"])
  .describe("The channel which the task has come in on");

const taskAttributes = z
  .object({
    from: z.string().describe("The address which the call originated from"),
    direction: z
      .enum(["inbound", "outbound"])
      .describe("Direction of the task"),
    conversations: z
      .object({
        initiated_by: z.string().optional(),
        conversation_id: z
          .string()
          .optional()
          .describe("A unique ID to link multiple segments of a conversation"),
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
        conversation_label_1: z.string().optional(),
        conversation_label_2: z.string().optional(),
        conversation_label_3: z.string().optional(),
        conversation_label_4: z.string().optional(),
        conversation_label_5: z.string().optional(),
        conversation_label_6: z.string().optional(),
        conversation_label_7: z.string().optional(),
        conversation_label_8: z.string().optional(),
        conversation_label_9: z.string().optional(),
        conversation_label_10: z.string().optional(),
        conversation_measure_1: z.string().optional(),
        conversation_measure_2: z.string().optional(),
        conversation_measure_3: z.string().optional(),
        conversation_measure_4: z.string().optional(),
        conversation_measure_5: z.string().optional(),
        conversation_measure_6: z.string().optional(),
        conversation_measure_7: z.string().optional(),
        conversation_measure_8: z.string().optional(),
        conversation_measure_9: z.string().optional(),
        conversation_measure_10: z.string().optional(),
      })
      .passthrough()
      .optional(),
    customers: z
      .object({
        external_id: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        gender: z.string().optional(),
        external_contact: z.string().optional(),
        customer_attribute_1: z.string().optional(),
        customer_attribute_2: z.string().optional(),
        customer_attribute_3: z.string().optional(),
        customer_label_1: z.string().optional(),
        customer_label_2: z.string().optional(),
        customer_label_3: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

/*
TODO: support for parsing a JSON string without needing to do `JSON.parse` on the
application side. The below code does this but then makes it impossible to extend
schemas since the resulting type becomes a `ZodEffect`.

export const taskAttributes = attributess.or(stringToJson.pipe(attributess));
export const extendTaskAttributes = (initial: ZodRawShape, extension: ZodRawShape) => {
let extendedSchema = attributess.extend(extension);
return extendedSchema.or(stringToJson.pipe(extendedSchema));
// };
*/

export type TaskChannelName = z.infer<typeof taskChannelName>;
export type TaskAttributes = z.infer<typeof taskAttributes>;
