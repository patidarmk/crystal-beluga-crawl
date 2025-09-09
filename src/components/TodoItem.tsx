"use client";

import React from "react";
import { Trash2, Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, text: string) => void;
  onCancel: () => void;
  editText: string;
  onEditTextChange: (text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  editText,
  onEditTextChange,
}) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-3 border rounded-lg bg-white dark:bg-gray-800">
        <input
          type="text"
          value={editText}
          onChange={(e) => onEditTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave(id, editText);
            } else if (e.key === "Escape") {
              onCancel();
            }
          }}
          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          autoFocus
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onSave(id, editText)}
          className="text-green-600 hover:text-green-700"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onCancel}
          className="text-red-600 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="data-[state=checked]:bg-blue-600"
      />
      <span
        className={`flex-1 ${
          completed
            ? "line-through text-gray-500 dark:text-gray-400"
            : "text-gray-900 dark:text-gray-100"
        }`}
      >
        {text}
      </span>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(id)}
          className="text-blue-600 hover:text-blue-700"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default TodoItem;