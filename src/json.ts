/**
 * Code taken from Jacob Weisenburger's Zod Utilz
 * https://github.com/JacobWeisenburger/zod_utilz/blob/4093595e5a6d95770872598ba3bc405d4e9c963b/src/json.ts
 */

import z from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;

type Json = Literal | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]));

export const json = () => jsonSchema;

// This is my own 👇

/**
 * Parses any string value into a JSON object
 */
export const stringToJson = z.string().transform((str, ctx): z.infer<ReturnType<typeof json>> => {
  try {
    return JSON.parse(str);
  } catch (e) {
    ctx.addIssue({ code: "custom", message: "Invalid JSON" });
    return z.NEVER;
  }
});
