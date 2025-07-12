"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { PlusCircle } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  type: z.enum(["Linear Regression", "Neural Network", "Clustering"]),
  reward: z.coerce.number().min(1, {
      message: "Reward must be a positive number."
  }),
  inputData: z.string().min(10, {
      message: "Input data must be provided."
  })
})

export default function CreateTaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "Linear Regression",
      reward: 100,
      inputData: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Task Created!",
      description: "Your new computational task has been submitted to the platform.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Analyze Stellar Light Curves" {...field} />
              </FormControl>
              <FormDescription>
                A short, descriptive title for your task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed explanation of the problem, the dataset, and the expected outcome."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
               <FormDescription>
                Use markdown for formatting. Be as specific as possible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Task Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a task type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Linear Regression">Linear Regression</SelectItem>
                        <SelectItem value="Neural Network">Neural Network</SelectItem>
                        <SelectItem value="Clustering">Clustering</SelectItem>
                    </SelectContent>
                </Select>
                 <FormDescription>
                    Choose the computational model required.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="reward"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Token Reward</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g., 500" {...field} />
                    </FormControl>
                    <FormDescription>
                        The amount of tokens awarded for a valid submission.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="inputData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Input Data</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your input data here, e.g., in CSV format."
                  className="resize-y min-h-[150px] font-code"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide the full dataset required to perform the task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
            <PlusCircle className="mr-2 h-4 w-4" />
            Submit Task
        </Button>
      </form>
    </Form>
  )
}
