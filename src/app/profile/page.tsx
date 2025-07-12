import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { user } from "@/lib/placeholder-data";
import StatsCard from "@/components/dashboard/stats-card";
import ActivityChart from "@/components/dashboard/activity-chart";
import { Award, Edit, FileText, Upload } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Card className="mb-8">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatsCard 
          title="Tokens Earned"
          value={user.stats.tokensEarned.toLocaleString()}
          icon={<Award className="h-6 w-6 text-primary" />}
          description="Total rewards from completed tasks"
        />
        <StatsCard 
          title="Tasks Completed"
          value={user.stats.tasksCompleted.toString()}
          icon={<FileText className="h-6 w-6 text-primary" />}
          description="Contributions to the community"
        />
        <StatsCard 
          title="Tasks Posted"
          value={user.stats.tasksPosted.toString()}
          icon={<Upload className="h-6 w-6 text-primary" />}
          description="Tasks you have created"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Activity Overview</CardTitle>
          <CardDescription>Your task and token activity over the last 5 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityChart data={user.activity} />
        </CardContent>
      </Card>
    </div>
  );
}
