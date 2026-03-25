// Mock AI functions so the UI works before we wire up real APIs.

export function generateProjectSummary(project) {
  const title = project?.title || "this project";
  const desc = project?.description || "";

  return [
    `CollabSpace AI Summary for "${title}"`,
    "",
    `What it is: ${desc || "No description provided yet."}`,
    "",
    "Suggested collaboration actions:",
    "- Create a short plan of next steps (who does what, by when).",
    "- Turn open questions into tasks so the team can track progress.",
    "- Share a quick status update so everyone stays aligned.",
    "",
    "Next AI suggestion:",
    "- Ask the assistant for a 3-step execution plan based on this project.",
  ].join("\n");
}

export function generateChatReply({ project, message, history }) {
  const title = project?.title || "this project";
  const text = (message || "").trim().toLowerCase();

  // Tiny “keyword” router so it feels responsive without real LLM calls.
  if (text.includes("plan") || text.includes("steps") || text.includes("roadmap")) {
    return [
      `Here’s a simple 3-step plan for "${title}":`,
      "1) Define the goal: what does “done” look like?",
      "2) Break work into small tasks and assign owners.",
      "3) Run a quick check-in: update progress + unblock anything stuck.",
      "",
      "Want me to turn it into a task list with owners?"
    ].join("\n");
  }

  if (text.includes("summary") || text.includes("summarize")) {
    return `You can generate a summary using the “Summary” tab. If you want, tell me what tone you prefer (brief or detailed).`;
  }

  if (text.includes("risk") || text.includes("blocked") || text.includes("stuck")) {
    return [
      `I can help identify risks for "${title}".`,
      "Quick questions:",
      "- What’s the biggest dependency right now?",
      "- Where are things most likely to slip (scope, time, approvals)?",
      "- What’s the earliest signal that tells you you’re going off track?",
    ].join("\n");
  }

  // Default: helpful, beginner-friendly response that references the project.
  const lastUserMessage = history
    ?.slice()
    .reverse()
    .find((m) => m.role === "user")?.content;

  return [
    `Got it. For "${title}", I can help you organize work and collaboration.`,
    "",
    "Try asking:",
    "- “Give me a 3-step plan”",
    "- “Summarize this project”",
    "- “What are the main risks?”",
    "",
    `You said: ${lastUserMessage || message}`,
  ].join("\n");
}

