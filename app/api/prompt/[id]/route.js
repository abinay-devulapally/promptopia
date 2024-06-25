import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, tag } = await req.json();
    await connectToDB();
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      params.id,
      { prompt, tag },
      { new: true }
    );
    if (!updatedPrompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletedPrompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify("Deleted Successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
};
