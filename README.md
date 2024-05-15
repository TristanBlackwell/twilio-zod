# Twilio Zod

## Table of contents

- [Twilio Zod](#twilio-zod)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
    - [Popular package managers](#popular-package-managers)
    - [Deno](#deno)
  - [Usage](#usage)
  - [Extending](#extending)
  - [Error handling](#error-handling)

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
import { sids } from "twilio-zod";

sids.conversationSidSchema.parse("CH5654396784325467987654345679543"); // => "CH5654396784325467987654345679543"

sids.conversationSidSchema.parse("CH33246"); // => throws a ZodError
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

## Error handling

All schemas will throw (or return if safe parsing) an instance of `ZodError`. See the [Zod documentation](https://github.com/colinhacks/zod/blob/master/README.md#error-handling) for further detail.

`ZodError` is brilliant for debugging but is not very user-friendly. A `generateMessage()` function is included which converts an instance of `ZodError` to a human-friendly, readable string. This takes the top-most error, ignoring the rest.

```ts
let result = sids.conversationSidSchema.safeParse("CH234");
if (!result.success) {
  console.error(generateMessage(result.error)); // => "too_small: SID must be 34 characters in length"
} else {
  console.log("Good!");
}
```
