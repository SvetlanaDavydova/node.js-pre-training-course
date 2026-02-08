import { TodoApi } from './todo-api';
import { Todo, TodoStatus } from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description = ''): Promise<Todo> {
    if (title.length === 0) {
      throw new ValidationError('Title can not be empty.')
    }

    return await this.api.add({ title, description});
  }

  async toggleStatus(id: number): Promise<Todo> {
    if (!id) {
      throw new ValidationError('Id is undefined.');
    }

    return await this.api.update(id, { status: TodoStatus.COMPLETED });
  }

  async search(keyword: string): Promise<Todo[]> {
    if (keyword.length === 0) {
      throw new ValidationError('Keyword is empty.');
    }

    const todos = await this.api.getAll();
    const filter = keyword.toLowerCase();

    return todos.filter(item => item.title.toLowerCase().includes(filter));
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}