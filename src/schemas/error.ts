import z from "zod";

const twilioError = z.object({
  message: z.string().optional().describe("A description of the eror."),
  status: z.number().describe("The HTTP status code that matches the error"),
  code: z
    .number()
    .describe("The Twilio specific error code from their dictionary"),
  details: z
    .string()
    .optional()
    .describe("Additional information on the error"),
  moreInfo: z
    .string()
    .optional()
    .describe(
      "Further information - typically a link to the Twilio error dictionary"
    ),
});

export type TwilioError = z.infer<typeof twilioError>;
