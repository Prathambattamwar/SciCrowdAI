'use server';

/**
 * @fileOverview An AI agent that provides feedback on task results.
 *
 * - provideResultFeedback - A function that provides feedback on task results.
 * - ProvideResultFeedbackInput - The input type for the provideResultFeedback function.
 * - ProvideResultFeedbackOutput - The return type for the provideResultFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideResultFeedbackInputSchema = z.object({
  taskType: z.string().describe('The type of task, e.g., linear regression.'),
  inputData: z.string().describe('The input data used for the task.'),
  submittedResult: z.string().describe('The result submitted by the contributor.'),
  expectedResult: z.string().optional().describe('The expected result, if available.'),
});
export type ProvideResultFeedbackInput = z.infer<typeof ProvideResultFeedbackInputSchema>;

const ProvideResultFeedbackOutputSchema = z.object({
  accuracyMetrics: z.string().describe('Metrics evaluating the accuracy of the result.'),
  potentialImprovements: z.string().describe('Suggestions for improving the result.'),
  validityDecision: z.string().describe('AI decision on result validity.'),
});
export type ProvideResultFeedbackOutput = z.infer<typeof ProvideResultFeedbackOutputSchema>;

export async function provideResultFeedback(input: ProvideResultFeedbackInput): Promise<ProvideResultFeedbackOutput> {
  return provideResultFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideResultFeedbackPrompt',
  input: {schema: ProvideResultFeedbackInputSchema},
  output: {schema: ProvideResultFeedbackOutputSchema},
  prompt: `You are an AI assistant that provides feedback on task results submitted by contributors.

  Task Type: {{{taskType}}}
  Input Data: {{{inputData}}}
  Submitted Result: {{{submittedResult}}}
  Expected Result (if available): {{{expectedResult}}}

  Analyze the submitted result, compare it to the expected result if available, and provide the following:

  1. Accuracy Metrics: Compute and describe relevant accuracy metrics (e.g., R², residuals for linear regression).
  2. Potential Improvements: Suggest specific ways the contributor could refine their methods to improve accuracy.
  3. Validity Decision: Make a decision about the validity of the result (valid, invalid, needs review) based on the accuracy metrics and potential improvements.

  Format your response as a JSON object with the following keys: accuracyMetrics, potentialImprovements, validityDecision.
  `,
});

const provideResultFeedbackFlow = ai.defineFlow(
  {
    name: 'provideResultFeedbackFlow',
    inputSchema: ProvideResultFeedbackInputSchema,
    outputSchema: ProvideResultFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
