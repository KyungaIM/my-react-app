import { Todo } from './model'

const BASE_URL = 'http://localhost:8080/api/todos';

interface TodoRequest {
  title: string;
  content: string;
}

export const todoApi = {
  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(BASE_URL);
    console.log(response);
    return response.json();
  },

  async fetchTodoById(id: number): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('할 일을 찾을 수 없습니다');
    return response.json();
  },
  
  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    console.log(todo)
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todo.title, content: todo.content })
    });
    return response.json();
  },

  async updateTodo(id: number, updates: TodoRequest): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  async deleteTodo(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  },

  async toggleTodoCheck(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}/toggle`, { method: 'PATCH' });
  }
} 