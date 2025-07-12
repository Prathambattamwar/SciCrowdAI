"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const submissionSchema = z.object({
  resultData: z.string().min(1, "Result data cannot be empty."),
});

export default function ResultSubmission() {
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      resultData: "",
    },
  });

  function onSubmit(values: z.infer<typeof submissionSchema>) {
    console.log(values);
    toast({
      title: "Result Submitted",
      description: "Your result is now pending AI validation.",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Submit Your Result</CardTitle>
        <CardDescription>
          Provide your computed result below. Ensure it matches the expected format.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resultData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your result here..."
                      className="min-h-[150px] font-code"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide the output from your computation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit for Validation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
