import { InMemoryRepository } from './repository';
import { Todo, NewTodo, TodoStatus } from './types';

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();
  private items: Todo[]  = [];

  async getAll(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.items), 600);
    })
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    const createdAt = new Date();
    const id = this.items.length === 0 ? 1 : this.items[this.items.length - 1].id + 1;
    
    const createdToDo: Todo = {
      ...newTodo,
      id,
      createdAt,
      status: TodoStatus.PENDING
    };

    this.items.push(createdToDo);

    return new Promise ((resolve) => {
      setTimeout(() => resolve(createdToDo), 600);
    });
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    const todoIndexToUpdate = this.items.findIndex(item => item.id = id);

    if(todoIndexToUpdate === -1) {
      throw new TodoNotFoundError('Todo not found.');
    };

    const newTodo = {
      ...this.items[todoIndexToUpdate],
      ...update
    };
    this.items[todoIndexToUpdate] = newTodo;

    return new Promise ((resolve) => {
      setTimeout(() => resolve(newTodo), 600);
    });
  }

  async remove(id: number): Promise<void> {
    const todoIndexToDelete = this.items.findIndex(item => item.id = id);

    if(todoIndexToDelete === -1) {
      throw new TodoNotFoundError('Todo not found.');
    }

    this.items.splice(todoIndexToDelete, 1);
    return new Promise ((resolve) => {
      setTimeout(() => resolve(), 600);
    });
  }
}

class TodoNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "TodoNotFoundError";
  }
}