import { Todo } from './types';

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  return [...state, todo];
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  const result = [...state];
  const todoIndexToUpdate = result.findIndex(item => item.id = id);

  if(todoIndexToUpdate === -1) {
    throw new Error('Object is not exists');
  }

  result[todoIndexToUpdate] = {
    ...result[todoIndexToUpdate],
    ...update
  };

  return result;
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  const result = [...state];
  const todoIndexToDelete = state.findIndex(item => item.id = id);

  if(todoIndexToDelete === -1) {
    throw new Error('Object is not exists');
  }
  
  result.splice(todoIndexToDelete, 1);
  return result;
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  return state.find(item => item.id = id);
}
