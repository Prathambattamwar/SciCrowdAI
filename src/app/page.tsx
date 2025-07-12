"use client";

import { useState } from "react";
import TaskCard from "@/components/tasks/task-card";
import TaskFilters from "@/components/tasks/task-filters";
import { tasks } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function Home() {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Computational Tasks
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and contribute to the latest challenges in decentralized science.
          </p>
        </div>
        <Link href="/tasks/new" passHref>
          <Button>
            <PlusCircle className="mr-2" />
            Create Task
          </Button>
        </Link>
      </div>
      
      <TaskFilters onFilterChange={setFilteredTasks} allTasks={tasks} />

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No Tasks Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
