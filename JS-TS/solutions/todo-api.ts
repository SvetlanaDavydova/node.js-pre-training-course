import { InMemoryRepository } from './repository';
import { Todo, NewTodo, TodoStatus } from './types';

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.repo.findAll()), 600);
    })
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    const createdAt = new Date();
    const allTodos = this.repo.findAll();
    const id = allTodos.length === 0 ? 1 : allTodos[allTodos.length - 1].id + 1;
    const status = TodoStatus.PENDING;
    
    const createdToDo: Todo = {
      ...newTodo,
      id,
      createdAt,
      status
    };

    this.repo.add(createdToDo);

    return new Promise ((resolve) => {
      setTimeout(() => resolve(createdToDo), 600);
    });
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    const todo = this.repo.findById(id);

    if(!todo) {
      throw new TodoNotFoundError('Todo not found.');
    }

    const newTodo = this.repo.update(id, update);

    return new Promise ((resolve) => {
      setTimeout(() => resolve(newTodo), 600);
    });
  }

  async remove(id: number): Promise<void> {
    const todo = this.repo.findById(id);

    if(!todo) {
      throw new TodoNotFoundError('Todo not found.');
    }

    this.repo.remove(id);
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