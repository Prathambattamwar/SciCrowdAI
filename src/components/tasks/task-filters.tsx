"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Task } from "@/lib/placeholder-data";
import { debounce } from "lodash";

type TaskFiltersProps = {
  onFilterChange: (filteredTasks: Task[]) => void;
  allTasks: Task[];
};

export default function TaskFilters({ onFilterChange, allTasks }: TaskFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const debouncedFilter = useCallback(debounce((term, stat, srt) => {
    let filtered = [...allTasks];

    // Filter by search term
    if (term) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(term.toLowerCase()) ||
          task.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filter by status
    if (stat !== "all") {
      filtered = filtered.filter((task) => task.status === stat);
    }

    // Sort
    switch (srt) {
      case "newest":
        filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
        break;
      case "reward_high":
        filtered.sort((a, b) => b.reward - a.reward);
        break;
      case "reward_low":
        filtered.sort((a, b) => a.reward - b.reward);
        break;
    }

    onFilterChange(filtered);
  }, 300), [allTasks, onFilterChange]);


  useEffect(() => {
    debouncedFilter(searchTerm, status, sort);
    // Cleanup debounce on component unmount
    return () => debouncedFilter.cancel();
  }, [searchTerm, status, sort, debouncedFilter]);

  return (
    <div className="mb-8 p-4 bg-card rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Validation">Validation</SelectItem>
                </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="reward_high">Highest Reward</SelectItem>
                    <SelectItem value="reward_low">Lowest Reward</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
  );
}
