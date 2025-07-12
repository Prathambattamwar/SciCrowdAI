"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ActivityChartProps = {
  data: { month: string; tasks: number; tokens: number }[];
};

export default function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))'
            }}
          />
          <Legend wrapperStyle={{fontSize: "14px"}}/>
          <Bar dataKey="tasks" fill="hsl(var(--primary))" name="Tasks" radius={[4, 4, 0, 0]} />
          <Bar dataKey="tokens" fill="hsl(var(--accent))" name="Tokens" radius={[4, 4, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
