import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateTaskForm from "@/components/tasks/create-task-form";

export default function NewTaskPage() {
  return (
    <div className="container mx-auto max-w-3xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Create a New Task</CardTitle>
          <CardDescription>
            Define a computational problem for the community to solve. Provide clear instructions and data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateTaskForm />
        </CardContent>
      </Card>
    </div>
  );
}
