// Removed unused import

interface GenerateAIResultParams {
  position: string;
  experience: number;
  techStack: string;
  description: string;
}

export const generateAIResult = async ({
  position,
  experience,
  techStack,
  description,
}: GenerateAIResultParams): Promise<{ questions: { question: string; answer: string }[] }> => {
  try {
    // This is a placeholder for the actual AI generation logic
    // You would typically call your AI service here
    const mockQuestions = [
      {
        question: `What experience do you have with ${techStack}?`,
        answer: `Based on your ${experience} years of experience, you should discuss your hands-on experience with ${techStack}, including specific projects and challenges you've worked on.`
      },
      {
        question: `How would you handle a challenging project in the ${position} role?`,
        answer: `As a ${position} with ${experience} years of experience, you should demonstrate your problem-solving approach, team collaboration skills, and how you've successfully managed similar challenges in the past.`
      },
      {
        question: `What are your strengths and weaknesses as a ${position}?`,
        answer: `Focus on your technical expertise in ${techStack} and your ability to ${description}. Be honest about areas where you're still growing while showing your commitment to professional development.`
      },
      {
        question: `How do you stay updated with the latest technologies in ${techStack}?`,
        answer: `Discuss your learning methods, such as following industry blogs, participating in online courses, contributing to open-source projects, and attending tech conferences.`
      },
      {
        question: `Describe a complex problem you solved in your previous role.`,
        answer: `Use the STAR method (Situation, Task, Action, Result) to describe a specific challenge you faced, how you approached it, and the positive outcome you achieved.`
      }
    ];

    return {
      questions: mockQuestions
    };
  } catch (error) {
    console.error("Error generating AI result:", error);
    throw new Error("Failed to generate interview questions");
  }
}; 