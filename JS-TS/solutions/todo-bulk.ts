import { Todo, TodoStatus } from './types';

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  return state.map(item => {
    item = completed ? {
      ...item,
      status: TodoStatus.COMPLETED
    } : 
    {
      ...item
    };
    
    return item;
  });
}

export function clearCompleted(state: Todo[]): Todo[] {
  return state.filter(item => item.status !== TodoStatus.COMPLETED);
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  return state.reduce((accumulator, currentValue) => {
    accumulator = currentValue.status === status ? ++accumulator : accumulator;

    return accumulator;
  }, 0);
}
