"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Gavel, Loader, ThumbsDown, ThumbsUp, XCircle } from "lucide-react";
import type { Task } from "@/lib/placeholder-data";
import { Progress } from "@/components/ui/progress";
import { decideValidity } from "@/ai/flows/decide-validity";
import { useToast } from "@/hooks/use-toast";

type ValidityToolProps = {
  decision: NonNullable<Task["validityDecision"]>;
};

export default function ValidityTool({ decision: initialDecision }: ValidityToolProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [decision, setDecision] = useState(initialDecision);
  const { toast } = useToast();

  const handleDecision = async (manualDecision: boolean) => {
      setIsLoading(true);
      try {
          // In a real app, you would get these details dynamically
          const result = await decideValidity({
              taskDescription: "Analyze Stellar Light Curves",
              inputData: "Time,Brightness\n0,1.00...",
              submittedResult: "y = -0.01x + 1.0, R² = 0.95",
              accuracyMetrics: "R-squared: 0.95, MAE: 0.02",
              feedback: "Manual decision override"
          });
          // Forcing the result based on button clicked for demonstration
          setDecision({...result, isValid: manualDecision});
          toast({
              title: "Decision Recorded",
              description: `Result marked as ${manualDecision ? 'Valid' : 'Invalid'}.`,
          });

      } catch (error) {
        console.error("AI decision failed:", error);
        toast({
            title: "Decision Failed",
            description: "Could not get a validity decision from the AI.",
            variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
            <Gavel className="h-5 w-5 text-primary"/>
            Validity Decision Tool
        </CardTitle>
        <CardDescription>AI-assisted moderation for result validation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-background rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <h4 className="font-semibold mb-1">AI Verdict</h4>
                {decision.isValid ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="mr-2 h-4 w-4"/> Valid
                    </Badge>
                ) : (
                    <Badge variant="destructive">
                        <XCircle className="mr-2 h-4 w-4"/> Invalid
                    </Badge>
                )}
            </div>
            <div className="flex-grow w-full md:w-auto">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm font-bold text-primary">{Math.round(decision.confidenceScore * 100)}%</span>
                </div>
                <Progress value={decision.confidenceScore * 100} />
            </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Reasoning</h4>
          <p className="text-sm text-foreground/80 border p-3 rounded-md">{decision.reason}</p>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2 text-sm">Manual Override</h4>
          <div className="flex gap-4">
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleDecision(true)} disabled={isLoading}>
                <ThumbsUp className="mr-2 h-4 w-4"/>
                Mark as Valid
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDecision(false)} disabled={isLoading}>
                <ThumbsDown className="mr-2 h-4 w-4"/>
                Mark as Invalid
            </Button>
            {isLoading && <Loader className="h-5 w-5 animate-spin text-primary"/>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
