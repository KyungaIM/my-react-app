import { Todo } from './model'

export const sortTodos = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => a.title.localeCompare(b.title))
} 