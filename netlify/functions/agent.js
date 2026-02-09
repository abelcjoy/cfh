exports.handler = async function (event, context) {
    // This is the "Brain" of the Agent.
    // It wakes up only when called.

    // 1. Parse the user's request
    const body = JSON.parse(event.body || '{}');
    const userMessage = body.message || "Hello";

    // 2. Simulate AI Processing (The "Work")
    // In real life, we would call OpenAI/Anthropic here.
    const responseSettings = {
        agentName: "WriterBot-v1",
        expertise: "Copywriting",
        status: "Online"
    };

    // 3. Return the result
    return {
        statusCode: 200,
        body: JSON.stringify({
            agent: responseSettings.agentName,
            reply: `[${responseSettings.agentName}]: I received your request: "${userMessage}". I am ready to write for you.`,
            cost: "$0.002"
        })
    };
}
