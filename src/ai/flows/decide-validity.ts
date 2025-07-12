'use server';

/**
 * @fileOverview This flow uses AI to make a decision about task validity.
 *
 * - decideValidity - A function that handles the task validity decision process.
 * - DecideValidityInput - The input type for the decideValidity function.
 * - DecideValidityOutput - The return type for the decideValidity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DecideValidityInputSchema = z.object({
  taskDescription: z.string().describe('The description of the computational task.'),
  inputData: z.string().describe('The input data used for the task.'),
  submittedResult: z.string().describe('The result submitted by the user.'),
  accuracyMetrics: z.string().describe('Accuracy metrics for the result, such as R-squared or residuals.'),
  feedback: z.string().optional().describe('Optional feedback from other users or validators.'),
});
export type DecideValidityInput = z.infer<typeof DecideValidityInputSchema>;

const DecideValidityOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the AI determines the submitted result to be valid.'),
  reason: z.string().describe('The AI’s reasoning for its validity decision.'),
  confidenceScore: z.number().describe('A score (0-1) indicating the AI’s confidence in its decision.'),
});
export type DecideValidityOutput = z.infer<typeof DecideValidityOutputSchema>;

export async function decideValidity(input: DecideValidityInput): Promise<DecideValidityOutput> {
  return decideValidityFlow(input);
}

const decideValidityPrompt = ai.definePrompt({
  name: 'decideValidityPrompt',
  input: {schema: DecideValidityInputSchema},
  output: {schema: DecideValidityOutputSchema},
  prompt: `You are an AI assistant that helps admins moderate the platform by making a decision about task validity.
  You must analyze the task description, input data, submitted result, and accuracy metrics to determine if the result is valid.
  Consider any feedback provided by other users or validators.

  Task Description: {{{taskDescription}}}
  Input Data: {{{inputData}}}
  Submitted Result: {{{submittedResult}}}
  Accuracy Metrics: {{{accuracyMetrics}}}
  Feedback: {{{feedback}}}

  Based on your analysis, determine if the submitted result is valid and provide a reason for your decision.  Also provide a confidence score between 0 and 1.
  Set the isValid field to true if the result is valid, and false otherwise.
  `,
});

const decideValidityFlow = ai.defineFlow(
  {
    name: 'decideValidityFlow',
    inputSchema: DecideValidityInputSchema,
    outputSchema: DecideValidityOutputSchema,
  },
  async input => {
    const {output} = await decideValidityPrompt(input);
    return output!;
  }
);

