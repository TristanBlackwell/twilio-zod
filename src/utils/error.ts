import { TwilioError } from "../schemas/error";
import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";

/**
Takes in a Zod error and simplifies to a single string error
message. If multiple errors are returned then just the top error
is generated.
*/
export function generateMessage(error: ZodError) {
  return generateErrorMessage(error.issues, {
    maxErrors: 1,
    delimiter: {
      component: ": ",
    },
    path: {
      enabled: true,
      type: "objectNotation",
      label: "",
    },
    code: {
      enabled: true,
      label: "",
    },
    message: {
      enabled: true,
      label: "",
    },
  });
}

/**
 * Takes in an error and determines whether it is an Error returned
 * from Twilio **as a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)**.
 * @param error The error to type check
 */
export function isTwilioError(error: unknown): error is TwilioError {
  return (
    error !== undefined &&
    error !== null &&
    typeof error === "object" &&
    "status" in error &&
    typeof error.status === "number" &&
    "code" in error &&
    typeof error.code === "number" &&
    "moreInfo" in error
  );
}
