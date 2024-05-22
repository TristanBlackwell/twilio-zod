import z from "zod";

export * as sids from "./sids";
export * as taskRouter from "./taskrouter";
export * as error from "./error";

// This doesn't guarentee a valid phone number but closely matches
// the [ITU E.164 recommendation](https://www.itu.int/rec/T-REC-E.164-201011-I/en)
export const e164PhoneNumber = z
  .string()
  .startsWith("+", "An E164 formatted number should start with '+'")
  .min(5, "An E164 formatted number must be at least 5 characters long")
  .max(15, "An E164 formatted number should be at most 15 characters")
  .refine((number) => number.charAt(1) !== "0", {
    message: "No country code begins with 0",
  });
