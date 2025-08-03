import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API
});

///////////////////////////////////////////////////////////////////

const Filter = z.object({
  listIndex: z.number(),
  videoTitle: z.string(),
  category: z.enum(["violence", "sexual", "inappropriate"]).nullable(),
});

const Content = z.object({
  filter: z.array(Filter),
});

export async function filterCall(input) {
  const response = await openai.responses.parse({
    model: "gpt-4o-mini-2024-07-18",
    input: [
      {
        "role": "system",
        "content": "Determine if the List of videos violates specific guidelines. Return all violating videos"
      },
      {
        "role": "user",
        "content": input
      }
    ],
    text: {
      format: zodTextFormat(Content, "content_compliance"),
    },
  });
  return response.output_parsed
}

///////////////////////////////////////////////////////////////////


/*
 * Returns a Promise with JSON Object: {confirm: boolean}
 * takes in 'instruction' and 'prompt'
 * determines if 'prompt' follows 'instruction'
 */
export async function confirmCallDep(instruction, input) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini-2024-07-18",
    instructions: instruction,
    input: input,
    text: {
      format: {
        type: "json_schema",
        name: "filter_content",
        description: "Determine if content complies with provided rules",
        schema: {
          type: "object",
          properties: {
            confirm: {
              type: "boolean",
              description: "Determines if content complies with provided rules"
            },
          },
          required: ["confirm"],
          additionalProperties: false
        },
        strict: true
      },
    },
  });
  return response.output_text;
}

/* Doesn't seem to work, can't enforce the correct number of outputs */
export async function filterCallDep(instruction, input) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini-2024-07-18",
    instructions: "You will be given an array of N video objects. For each object, place it either in allowedIndexes or removedIndexes based on whether input[i] passes the filter. Every index must be included in the output. filter: " + instruction,
    input: input,
    text: {
      format: {
        type: "json_schema",
        name: "filter_content",
        description: "Filter the array based on the provided rules",
        schema: {
          type: "object",
          properties: {
            allowedIndexes: {
              type: "array",
              description: "Indexes of videos that pass the filter",
              items: { type: "integer" }
            },
            removedIndexes: {
              type: "array",
              description: "index of videos that don't pass the filter followed by three word reason for why",
              items: { type: "string" }
            }
          },
          required: ["allowedIndexes", "removedIndexes"],
          additionalProperties: false
        },
        strict: true
      }
    }
  });

  return response.output_text;
}

export async function filterCallDep2(instruction, input) {
  const len = input.length
  console.log(len);
  const response = await openai.responses.create({
    model: "gpt-4o-mini-2024-07-18",
    instructions: `Here is an array of ${len} video objects. For each object, return a boolean (true or false) in a filteredResults array, where each boolean at index i corresponds to whether input[i] passes the filter. filter: ` + instruction,
    input: input,
    text: {
      format: {
        type: "json_schema",
        name: "filter_content",
        description: "Filter the array based on the provided rules.",
        schema: {
          type: "object",
          properties: {
            filteredResults: {
              type: "array",
              description: "does index i pass the filter",
              items: { type: "boolean" }
            }
          },
          required: ["filteredResults"],
          additionalProperties: false
        },
        strict: true
      }
    }
  });

  return response.output_text;
}
