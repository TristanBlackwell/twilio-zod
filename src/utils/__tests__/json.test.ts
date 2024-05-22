import { beforeEach, describe, expect, test, vi } from "vitest";

import { generateMessage } from "../error";
import { stringToJson } from "../json";
import z from "zod";

function mockGetConversation() {
  throw {
    message: "The requested resource Conversations/CHXXX could not be found",
    status: 404,
    code: 31002,
    details: "Conversation not found",
    moreInfo: "https://twilio.com",
  };
}

describe("json utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("stringToJson doesn't throw safe parsing bad JSON", () => {
    let badJson = `{ "sid": CH1234 }`;

    const parsedBadJson = stringToJson.safeParse(badJson);
    if (parsedBadJson.success) {
      console.log(parsedBadJson);
      throw new Error("Expected failed parse");
    }

    expect(generateMessage(parsedBadJson.error)).toBe(
      "custom - ./ - Invalid JSON"
    );
  });

  test("stringToJson parses valid JSON", () => {
    let json = `{ "sid": "CH1234" }`;

    stringToJson.parse(json);
  });

  test("stringToJson can pipe JSON into subsequent schema", () => {
    let json = `{ "sid": "CH1234" }`;
    let schema = stringToJson.pipe(
      z.object({ sid: z.string().startsWith("CH") })
    );

    schema.parse(json);
  });
});
