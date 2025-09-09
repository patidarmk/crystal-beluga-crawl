"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ total, completed, pending }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-center">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center">{total}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-center text-green-600">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center text-green-600">{completed}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-center text-orange-600">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center text-orange-600">{pending}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoStats;