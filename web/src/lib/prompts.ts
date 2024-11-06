export const generateWelcomeMessagePrompt = ({
  firstName,
  hobbies,
  jobRole,
  industry,
  personalGoals,
  aiKnowledge,
  challenges,
}: {
  firstName: string;
  hobbies: string;
  jobRole: string;
  industry: string;
  personalGoals: string;
  aiKnowledge: string;
  challenges: string;
}) => {
  return `You are to create a personalized welcome message for a new user starting an AI introductory
course. The user has provided the following information:
● First Name: ${firstName}
● Hobbies: ${hobbies}
● Job Role: ${jobRole}
● Industry: ${industry}
● Personal Goals: ${personalGoals}
● Current Knowledge about AI: ${aiKnowledge}
● Challenges Faced in Their Job: ${challenges}

Using this information, craft a friendly and motivating message that:
● Helps the user relate to the content.
● Is easily approachable.
● Emphasizes the realistic possibilities and benefits of AI in their everyday life and work.
● Shows empathy if the user is not familiar with AI.
● Motivates the user by highlighting how learning about AI can benefit and ease their life.
● Avoids overhyping AI and only proposes use cases that actually have value.
The message should be in the form of a script suitable for a voice or video recording. Ensure
the tone is encouraging, friendly, and tailored to the user's background and interests.`;
};
