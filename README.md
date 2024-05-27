# Twilio Zod

<p align="center">
    <a href="https://github.com/TristanBlackwell/twilio-zod/actions"><img src="https://img.shields.io/github/actions/workflow/status/TristanBlackwell/twilio-zod/publish.yaml?branch=main" alt="Build Status"></a>
    <a href="https://www.npmjs.com/package/twilio-zod"><img src="https://img.shields.io/npm/dt/twilio-zod.svg" alt="Total Downloads"></a>
    <a href="https://github.com/TristanBlackwell/twilio-zod/releases"><img src="https://img.shields.io/npm/v/twilio-zod.svg" alt="Latest Release"></a>
    <a href="https://github.com/TristanBlackwell/twilio-zod/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/twilio-zod.svg" alt="License"></a>
</p>

## Table of contents

- [Twilio Zod](#twilio-zod)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
    - [Popular package managers](#popular-package-managers)
    - [Deno](#deno)
  - [Usage](#usage)
  - [Extending](#extending)
  - [Utilities](#utilities)
    - [String to JSON](#string-to-json)
  - [Error handling](#error-handling)
    - [Parsing](#parsing)
    - [NodeJS library](#nodejs-library)
      - [Zod Schema (preferred)](#zod-schema-preferred)
      - [Type guard](#type-guard)

## Introduction

Twilio Zod is a collection of [Zod](https://github.com/colinhacks/zod) helpers designed for making Twilio application development easier.

Twilio Zod aims to remove the guesswork of Twilio objects, increase predictability, and extend type safety during development.

## Installation

- Typescript 4.5+
- Enable _strict_ mode in the `tsconfig.json` (Why wouldn't you?)

### Popular package managers

```sh
npm install twilio-zod
yarn add twilio-zod
bun add twilio-zod
pnpm add zod
```

### Deno

Not yet supported

## Usage

> If are not already familiar with Zod, please [start here](https://github.com/colinhacks/zod).

The most common usage is validating various [SIDs](https://www.twilio.com/docs/glossary/what-is-a-sid) from Twilio.

```ts
import { schemas } from "twilio-zod";

schemas.sids.conversation.parse("CH5654396784325467987654345679543"); // => "CH5654396784325467987654345679543"

schemas.sids.conversation.parse("CH33246"); // => throws a ZodError
```

## Extending

In some cases, the provided schemas do not sufficiently describe the data you are parsing. Where possible, all parsed objects utilise Zods [`.passthrough()`](https://zod.dev/?id=passthrough) utility to avoid stripping other unrecognised keys. This means you can still access properties however at your own risk since these have not been parsed.

As an alternative, you will likely want to [extend](https://zod.dev/?id=extend) the provided schema to add your own properties:

**without extending**
```ts
import { schemas } from "twilio-zod"

const taskAttributes = {
  roles: ["admin"],
  full_name: "John Doe",
  language: "en-GB" // This property is not described
}

let parsedTaskAttributes = schemas.taskRouter.taskAttributes.parse(taskAttributes) // { roles: ["admin"], ... }

parsedTaskAttributes.roles // => string[]
parsedTaskAttributes.language // => unknown ❌
```

**extending**
```ts
import { schemas } from "twilio-zod"

const taskAttributes = {
  roles: ["admin"],
  full_name: "John Doe",
  language: "en-GB" // This property is not described
}

let extendedSchema = schemas.taskRouter.taskAttributes.extend({ language: z.string() })

let parsedTaskAttributes = extendedSchema.parse(taskAttributes) // { roles: ["admin"], ... }

parsedTaskAttributes.roles // => string[]
parsedTaskAttributes.language // => string ✔
```

## Utilities

### String to JSON

In some events, Twilio will return a JSON as a string object. To predictably parse within a Zod schema a `stringToJson()` utility is exposed.
This can be used to implicity parse as JSON string and validate it against an schema:

```ts
import { schemas, stringToJson } from "twilio-zod"

const attributesSchema = z.object({
  conversationSid: schemas.sids.conversation
});

/*
{
  name: "John Doe",
  attributes: "{\"avatarUrl\": \"http://....\", \"conversationSid\": \"CH....\"}"
}
*/
const eventSchema = z.object({
  name: z.string(),
  attributes: stringToJson.pipe(attributesSchema) // This will parse a JSON string then validate it against the attributes schema
})
```

## Error handling

### Parsing

All schemas will throw (or return if safe parsing) an instance of `ZodError`. See the [Zod documentation](https://github.com/colinhacks/zod/blob/master/README.md#error-handling) for further detail.

`ZodError` is brilliant for debugging but is not very user-friendly. A `generateErrorMessage()` function is included which converts an instance of `ZodError` to a human-friendly, readable string. This takes the top-most error, ignoring the rest.

```ts
import { schemas, generateErrorMessage } from "twilio-zod"

let result = schemas.sids.conversation.safeParse("CH234");
if (!result.success) {
  console.error(error.generateErrorMessage(result.error)); // => "too_small: SID must be 34 characters in length"
} else {
  console.log("Good!");
}
```

### NodeJS library

The [Twilio NodeJS](https://www.npmjs.com/package/twilio) will throw on operations when an error is met. Generally, Twilio with throw a standard format similiar to:

```json
{
  "message": "A description of the error",
  "status": "The HTTP status code matching the error",
  "code": "The Twilio specific error code from their dictionary",
  "details": "Additional information on the error",
  "moreInfo": "Further information - typically a link to the definition on the dictionary"
}
```

Naturally with TypeScript, an error caught in a catch block will be of a type `any` or `unknown`. There is two
methods of dealing with this:

#### Zod Schema (preferred)

A schema is exposed that can parse the error returned much like you would parse any other object:

```ts
import { schemas } from "twilio-zod/error"

try {
  twilio.conversations.v1.conversations("CH1234").fetch() // 404 error thrown
} catch (err /* unknown */) {
  let parsedError = schemas.error.twilioError.parse(err)
  parsedError.data // TwilioError
}
```


#### Type guard

You can use the exposed `isTwilioError()` type guard function:

```ts
import { isTwilioError } from "twilio-zod"

try {
  twilio.conversations.v1.conversations("CH1234").fetch() // 404 error thrown
} catch (err /* unknown */) {
  if (isTwilioError(err)) {
    err // TwilioError
  }
}
```
