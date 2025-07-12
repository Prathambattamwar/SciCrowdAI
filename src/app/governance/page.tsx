import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { governanceProposals } from "@/lib/placeholder-data";
import { ThumbsDown, ThumbsUp, Vote } from "lucide-react";

export default function GovernancePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight flex items-center gap-2">
            <Vote className="h-8 w-8 text-primary"/>
            Governance Portal
        </h1>
        <p className="text-muted-foreground mt-1">
          Vote on proposals to shape the future of the SciCrowdAI platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {governanceProposals.map((proposal) => {
            const totalVotes = proposal.votesFor + proposal.votesAgainst;
            const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
            const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;

          return (
            <Card key={proposal.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-headline">{proposal.title}</CardTitle>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${proposal.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {proposal.status}
                    </span>
                </div>
                <CardDescription>{proposal.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-green-400">For</span>
                        <span className="text-sm text-muted-foreground">{proposal.votesFor.toLocaleString()}</span>
                    </div>
                    <Progress value={forPercentage} className="h-2 [&>div]:bg-green-500" />
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-red-400">Against</span>
                        <span className="text-sm text-muted-foreground">{proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <Progress value={againstPercentage} className="h-2 [&>div]:bg-red-500"/>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {proposal.status === 'Active' ? (
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                        <ThumbsUp className="mr-2 h-4 w-4"/> Vote For
                    </Button>
                     <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                        <ThumbsDown className="mr-2 h-4 w-4"/> Vote Against
                    </Button>
                  </div>
                ) : (
                    <p className="text-sm text-muted-foreground w-full text-center">Voting has ended.</p>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
