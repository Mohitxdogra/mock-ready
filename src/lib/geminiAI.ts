export async function generateSummary(skills: string[]): Promise<string> {
    try {
        // Simulating AI summary generation (Replace this with actual API call)
        const summary = `With expertise in ${skills.join(", ")}, I am a highly skilled professional ready to tackle challenges and deliver solutions.`;
        
        return summary;
    } catch (error) {
        console.error("Error generating summary:", error);
        return "Error generating summary. Please try again.";
    }
}
