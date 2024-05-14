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
