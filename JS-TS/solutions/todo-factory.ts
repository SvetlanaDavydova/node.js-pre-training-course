import { Todo, NewTodo, TodoStatus } from './types';

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  const date = new Date();

  const result = {
    ...input,
    id: nextId,
    createdAt: date,
    status: TodoStatus.PENDING,
  };

  ++nextId;
  return result;
}
