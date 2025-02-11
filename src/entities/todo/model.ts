export interface Todo {
  id: number;
  title: string;
  content: string;
  check: boolean;
}

export class TodoEntity {
  constructor(private todo: Todo) {}

  toggleCheck() {
    this.todo.check = !this.todo.check;
  }

  isValid(): boolean {
    return this.todo.title.length > 0;
  }

  toJSON(): Todo {
    return { ...this.todo };
  }
} 