'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing task results using AI.
 *
 * - analyzeTaskResults - Analyzes task results and provides an accuracy assessment.
 * - AnalyzeTaskResultsInput - The input type for the analyzeTaskResults function.
 * - AnalyzeTaskResultsOutput - The return type for the analyzeTaskResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTaskResultsInputSchema = z.object({
  taskType: z.string().describe('The type of task, e.g., linear regression, neural network.'),
  inputDataDescription: z.string().describe('A description of the input data used for the task.'),
  resultsData: z.string().describe('The results data submitted by a user for the task.'),
});
export type AnalyzeTaskResultsInput = z.infer<typeof AnalyzeTaskResultsInputSchema>;

const AnalyzeTaskResultsOutputSchema = z.object({
  accuracyMetrics: z.record(z.string(), z.number()).describe('A set of accuracy metrics for the task results, such as R-squared, residuals, etc.'),
  potentialIssues: z.string().describe('A description of any potential issues identified in the task results.'),
  isLikelyValid: z.boolean().describe('A boolean value indicating whether the task results are likely valid'),
  feedback: z.string().describe('Feedback on the task results including potential improvements or corrections.'),
});
export type AnalyzeTaskResultsOutput = z.infer<typeof AnalyzeTaskResultsOutputSchema>;

export async function analyzeTaskResults(input: AnalyzeTaskResultsInput): Promise<AnalyzeTaskResultsOutput> {
  return analyzeTaskResultsFlow(input);
}

const analyzeTaskResultsPrompt = ai.definePrompt({
  name: 'analyzeTaskResultsPrompt',
  input: {schema: AnalyzeTaskResultsInputSchema},
  output: {schema: AnalyzeTaskResultsOutputSchema},
  prompt: `You are an AI expert specializing in analyzing task results and providing accuracy assessments.

You will analyze the task results, identify potential issues, compute accuracy metrics, and return whether the task is likely valid.

Task Type: {{{taskType}}}
Input Data Description: {{{inputDataDescription}}}
Results Data: {{{resultsData}}}

Based on your analysis, provide the accuracyMetrics, potentialIssues, isLikelyValid, and feedback.  Ensure the accuracyMetrics field contains common metrics like R-squared and residuals (where applicable).  Be specific with feedback, listing the line number in resultsData with the issue.
`,
});

const analyzeTaskResultsFlow = ai.defineFlow(
  {
    name: 'analyzeTaskResultsFlow',
    inputSchema: AnalyzeTaskResultsInputSchema,
    outputSchema: AnalyzeTaskResultsOutputSchema,
  },
  async input => {
    const {output} = await analyzeTaskResultsPrompt(input);
    return output!;
  }
);
