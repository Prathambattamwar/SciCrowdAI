"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Check, FileWarning, Lightbulb, Loader, RefreshCw } from "lucide-react";
import type { Task } from "@/lib/placeholder-data";
import { analyzeTaskResults } from "@/ai/flows/analyze-task-results";
import { useToast } from "@/hooks/use-toast";

type AiAnalysisProps = {
  analysis: NonNullable<Task["aiAnalysis"]>;
};

export default function AiAnalysis({ analysis: initialAnalysis }: AiAnalysisProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(initialAnalysis);
    const { toast } = useToast();

    const handleReanalyze = async () => {
        setIsLoading(true);
        try {
            // In a real app, you would get task details dynamically
            const result = await analyzeTaskResults({
                taskType: "Linear Regression",
                inputDataDescription: "Stellar light curve data",
                resultsData: "y = -0.01x + 1.0, R² = 0.95"
            });
            setAnalysis(result);
            toast({
                title: "Analysis Complete",
                description: "The AI has re-analyzed the task results.",
            });
        } catch (error) {
            console.error("AI Analysis failed:", error);
            toast({
                title: "Analysis Failed",
                description: "Could not re-run AI analysis. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <Card className="bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 font-headline">
            <BrainCircuit className="h-5 w-5 text-primary" />
            AI Result Analysis
          </CardTitle>
          <CardDescription>Automated feedback on the submitted result.</CardDescription>
        </div>
        <Button onClick={handleReanalyze} disabled={isLoading} size="sm" variant="outline">
            {isLoading ? (
                <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                </>
            ) : (
                <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Re-analyze
                </>
            )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2 flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Accuracy Metrics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-background rounded-md">
            {Object.entries(analysis.accuracyMetrics).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-mono font-medium">{value}</span>
                </div>
            ))}
          </div>
        </div>

        <div>
            <h4 className="font-semibold mb-2 flex items-center"><FileWarning className="h-4 w-4 mr-2 text-yellow-500"/> Potential Issues</h4>
            <p className="text-sm text-foreground/80 p-4 bg-background rounded-md">{analysis.potentialIssues}</p>
        </div>
        
        <div>
            <h4 className="font-semibold mb-2 flex items-center"><Lightbulb className="h-4 w-4 mr-2 text-blue-500"/> Feedback & Improvements</h4>
            <p className="text-sm text-foreground/80 p-4 bg-background rounded-md">{analysis.feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
}
