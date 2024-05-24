import { beforeEach, describe, expect, test, vi } from "vitest";
import { generateErrorMessage, isTwilioError } from "../error";

import { conversation } from "../../schemas/sids";
import { twilioError } from "../../schemas/error";

function mockGetConversation() {
  throw {
    message: "The requested resource Conversations/CHXXX could not be found",
    status: 404,
    code: 31002,
    details: "Conversation not found",
    moreInfo: "https://twilio.com",
  };
}

describe("error utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("generateMessage provides a human readable error message", () => {
    let badConversationSid = "CH1234";
    const parsedSid = conversation.safeParse(badConversationSid);

    if (parsedSid.success) {
      throw new Error("Expected failed parse");
    }

    expect(generateErrorMessage(parsedSid.error)).toBe(
      "too_small - ./ - SID must be 34 characters in length",
    );
  });

  test("isTwilioError detects a Twilio client error", async () => {
    try {
      mockGetConversation();
      console.log("passed");
    } catch (err) {
      if (isTwilioError(err)) {
        return;
      }
    }

    throw new Error("Twilio error was not identified");
  });

  test("twilioError parses a Twilio client error", async () => {
    try {
      mockGetConversation();
      console.log("passed");
    } catch (err) {
      twilioError.parse(err);
    }
  });
});
