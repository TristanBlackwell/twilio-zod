import { stringToJson } from "../../json";
import z from "zod";

const workerRouting = z
  .object({
    skills: z.string().array().describe("Assigned skills"),
    levels: z.object({}).passthrough(),
  })
  .passthrough()
  .describe("Assigned skills");

const attributes = z
  .object({
    contact_uri: z.string().startsWith("client").describe("Contact address"),
    disabled_skills: workerRouting,
    email: z.string().email().describe("Workers email"),
    full_name: z.string().describe("Workers full name"),
    image_url: z.string().describe("URL of the avatar image"),
    roles: z.string().array().describe("Assigned system roles"),
    routing: workerRouting,
  })
  .passthrough()
  .describe("The workers attributes");

export const workerAttributes = attributes.or(stringToJson.pipe(attributes));

export type workerAttributes = z.infer<typeof workerAttributes>;
