import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Task } from "@/lib/placeholder-data";
import { ArrowRight, Award, Clock, Code, FlaskConical, Users } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type TaskCardProps = {
  task: Task;
};

const statusColors = {
  Open: "bg-green-500 hover:bg-green-600",
  "In Progress": "bg-yellow-500 hover:bg-yellow-600",
  Completed: "bg-blue-500 hover:bg-blue-600",
  Validation: "bg-purple-500 hover:bg-purple-600",
};


export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <Badge variant="secondary" className="mb-2">
                    <FlaskConical className="h-3 w-3 mr-1" />
                    {task.type}
                </Badge>
                <CardTitle className="text-xl font-headline">{task.title}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">{task.description}</CardDescription>
            </div>
            <Badge className={statusColors[task.status]}>{task.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <span>{task.reward} Tokens</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{task.results?.length || 0} Submissions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>Posted {formatDistanceToNow(new Date(task.postedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={task.author.avatar} alt={task.author.name} />
            <AvatarFallback>{task.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{task.author.name}</span>
        </div>
        <Link href={`/tasks/${task.id}`} passHref>
          <Button size="sm" variant="outline">
            View Details
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
