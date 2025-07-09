import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API
});

///////////////////////////////////////////////////////////////////

/*
 * Returns a Promise with JSON Object: {confirm: boolean, explanation: String | null}
 * takes in 'instruction' and 'prompt'
 * determines if 'prompt' follows 'instruction'
 */
export async function confirmCall(instruction, prompt) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini-2024-07-18",
    instructions: instruction,
    input: prompt,
    text: {
      format: {
        "type": "json_schema",
        "name": "content_compliance",
        "description": "Determines if content complies with provided rules",
        "schema": {
          "type": "object",
          "properties": {
            "confirm": {
              "type": "boolean",
              "description": "Determines if content complies with provided rules"
            },
            "explanation": {
              "type": ["string", "null"],
              "description": "Short sentence explanation of why the content is violating"
            }
          },
          "required": ["confirm", "explanation"],
          "additionalProperties": false
        },
        "strict": true
      },
    },
  });
  return response.output_text;
}