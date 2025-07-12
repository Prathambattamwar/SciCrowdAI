import { tasks } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ResultSubmission from "@/components/tasks/result-submission";
import AiAnalysis from "@/components/tasks/ai-analysis";
import ValidityTool from "@/components/tasks/validity-tool";
import { Award, Clock, Code, FileText, FlaskConical, MessageSquare, User } from "lucide-react";
import { format } from "date-fns";

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
  const task = tasks.find((t) => t.id === params.id);

  if (!task) {
    notFound();
  }
  
  const statusColors = {
    Open: "bg-green-500 hover:bg-green-600",
    "In Progress": "bg-yellow-500 hover:bg-yellow-600",
    Completed: "bg-blue-500 hover:bg-blue-600",
    Validation: "bg-purple-500 hover:bg-purple-600",
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Task Info */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      <FlaskConical className="h-3 w-3 mr-1" />
                      {task.type}
                    </Badge>
                    <CardTitle className="text-3xl font-headline">{task.title}</CardTitle>
                  </div>
                  <Badge className={statusColors[task.status]}>{task.status}</Badge>
              </div>
              <CardDescription className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.author.avatar} />
                    <AvatarFallback>{task.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {task.author.name}
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4"/>
                    {format(new Date(task.postedAt), "PPP")}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 whitespace-pre-wrap">{task.description}</p>
            </CardContent>
          </Card>

          {/* Input Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Code className="h-5 w-5 text-primary"/> Input Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md text-sm font-code overflow-x-auto">
                <code>{task.inputData}</code>
              </pre>
            </CardContent>
          </Card>
          
          {/* AI Analysis and Validity */}
          {task.aiAnalysis && task.validityDecision && (
            <div className="space-y-8">
              <AiAnalysis analysis={task.aiAnalysis} />
              <ValidityTool decision={task.validityDecision} />
            </div>
          )}
          
          {/* Result Submission */}
          {task.status === "Open" && <ResultSubmission />}

          {/* Comments */}
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><MessageSquare className="h-5 w-5 text-primary"/> Community Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  {task.comments?.map((comment, index) => (
                      <div key={index} className="flex gap-3">
                           <Avatar className="h-9 w-9">
                              <AvatarImage src={`/avatars/${comment.author.toLowerCase()}.png`} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                              <div className="flex justify-between items-center">
                                  <p className="font-semibold">{comment.author}</p>
                                  <p className="text-xs text-muted-foreground">{format(new Date(comment.timestamp), 'PPp')}</p>
                              </div>
                              <p className="text-sm text-foreground/80">{comment.comment}</p>
                          </div>
                      </div>
                  ))}
                  {!task.comments && <p className="text-muted-foreground text-sm">No comments yet.</p>}
              </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Task Vitals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><Award className="h-4 w-4"/>Reward</span>
                    <span className="font-semibold">{task.reward} Tokens</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4"/>Submissions</span>
                    <span className="font-semibold">{task.results?.length || 0}</span>
                </div>
            </CardContent>
            {task.status === 'Completed' && task.validityDecision?.isValid && (
                 <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Award className="mr-2 h-4 w-4" /> Claim Reward
                    </Button>
                </CardFooter>
            )}
          </Card>

           {task.results && task.results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Latest Submission</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground"/>
                    <span className="font-semibold">{task.results[0].submittedBy}</span>
                  </div>
                  <pre className="p-3 bg-muted rounded-md text-xs font-code overflow-x-auto">
                    <code>{task.results[0].resultData}</code>
                  </pre>
              </CardContent>
            </Card>
           )}
        </div>
      </div>
    </div>
  );
}
