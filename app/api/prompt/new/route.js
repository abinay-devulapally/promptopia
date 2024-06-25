import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function POST(req) {
  try {
    const { prompt, userId, tag } = await req.json();

    await connectToDB();

    console.log(
      "\x1b[36m%s\x1b[0m",
      "Prompt:",
      prompt,
      "\x1b[32m%s\x1b[0m",
      "User ID:",
      userId,
      "\x1b[33m%s\x1b[0m",
      "Tag:",
      tag
    );

    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
