const handler = () => {
  try {
    return new Response("This route is working", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
};

export { handler as GET };
