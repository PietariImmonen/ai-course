export const generateWelcomeMessagePrompt = ({
  firstName,
  jobRole,
  hobbies,
  aiKnowledge,
}: {
  firstName: string;
  jobRole: string;
  hobbies: string;
  aiKnowledge: string;
}) => {
  return `As an AI course mentor, create a warm, personalized welcome message for ${firstName}. Here's what you know about them:

Background:
- They work as: ${jobRole}
- Their hobbies and interests: ${hobbies}
- Their current AI knowledge: ${aiKnowledge}

Instructions for crafting the message:
1. Start with a warm, personal greeting using their first name
2. Acknowledge their current role and validate its importance
3. Reference their hobbies and how AI might enhance or relate to their interests
4. Meet them at their current AI knowledge level:
   - If beginner: Reassure and emphasize the step-by-step learning approach
   - If intermediate/advanced: Acknowledge their existing expertise and promise deeper insights
5. Include one specific, achievable example of how AI could enhance their work or hobbies
6. End with an encouraging call to action for starting their learning journey

Keep the tone:
- Conversational and friendly
- Professional but not overly formal
- Encouraging without being overwhelming
- Realistic about AI's capabilities (no hype or exaggeration)

The message should be 2-3 paragraphs long and feel like a personal video introduction.`;
};
