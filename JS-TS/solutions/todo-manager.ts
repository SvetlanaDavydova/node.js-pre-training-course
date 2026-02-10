import { TodoService } from './todo-service';
import { TodoApi } from './todo-api';
import { Todo } from './types';
import { InMemoryRepository } from './repository';

export class ToDoManager {
  private api = new TodoApi();
  private service = new TodoService(this.api);
  private repository = new InMemoryRepository();

  async init(): Promise<void> {
    await this.api.add({ title: 'test1', description: 'demo init' });
    await this.api.add({ title: 'test2', description: 'demo init' });
  }

  async add(title: string, description = ''): Promise<void> {  
    await this.api.add({ title, description });
  }

  async complete(id: number): Promise<void> {
    await this.service.toggleStatus(id);
  }

  async list(): Promise<Todo[]> {
    return await this.api.getAll();
  }
}
