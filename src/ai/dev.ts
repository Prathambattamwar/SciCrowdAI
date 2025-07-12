import { config } from 'dotenv';
config();

import '@/ai/flows/provide-result-feedback.ts';
import '@/ai/flows/analyze-task-results.ts';
import '@/ai/flows/decide-validity.ts';