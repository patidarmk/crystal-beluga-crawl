"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import TodoStats from "@/components/TodoStats";
import TodoFilter, { FilterType } from "@/components/TodoFilter";
import { MadeWithApplaa } from "@/components/made-with-applaa";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo]);
    toast.success("Todo added successfully!");
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.error("Todo deleted!");
  }

  const startEdit = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setEditingId(id);
      setEditText(todo.text);
    }
  }

  const saveEdit = (id: string, text: string) => {
    if (text.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: text.trim() } : todo
        )
      );
      setEditingId(null);
      setEditText("");
      toast.success("Todo updated!");
    }
  }

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Todo App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <TodoForm onAdd={addTodo} />
          
          <TodoStats
            total={todos.length}
            completed={completedCount}
            pending={pendingCount}
          />
          
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
          />
          
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {filter === "all" && "No todos yet. Add one above!"}
              {filter === "active" && "No active todos. Great job!"}
              {filter === "completed" && "No completed todos yet."}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  isEditing={editingId === todo.id}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={startEdit}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                  editText={editText}
                  onEditTextChange={setEditText}
                />
              ))}
            </div>
          )}
        </div>
        
        <MadeWithApplaa />
      </div>
    </div>
  );
}

export default Index;