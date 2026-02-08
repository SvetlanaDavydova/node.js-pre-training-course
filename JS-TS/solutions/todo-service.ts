import { TodoApi } from './todo-api';
import { Todo, TodoStatus } from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description = ''): Promise<Todo> {
    return await this.api.add({ title, description});
  }

  async toggleStatus(id: number): Promise<Todo> {
    return await this.api.update(id, { status: TodoStatus.COMPLETED });
  }

  async search(keyword: string): Promise<Todo[]> {
    const todos = await this.api.getAll();
    const filter = keyword.toLowerCase();

    return todos.filter(item => item.title.toLowerCase().includes(filter));
  }
}
