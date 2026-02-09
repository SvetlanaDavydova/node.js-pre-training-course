import { InMemoryRepository } from "../JS-TS/solutions/repository";
import { TodoApi } from "../JS-TS/solutions/todo-api";
import { TodoService } from "../JS-TS/solutions/todo-service";

describe('Unit tests for Todo service', () => {
    jest.setTimeout(5000);
    const service = new TodoService(new TodoApi());

    it('should successfully create todo', async () => {
        const todo = await service.create('first item');

        expect(todo.title).toBe('first item');
        expect(todo.id).toBe(1);
    });

    it('should toggle status', async () => {
        const todo = await service.create('second item');
        const updatedTodo = await service.toggleStatus(todo.id);

        expect(updatedTodo.status).not.toBe(todo.status);
    });

    it('should search matching items', async () => {
        await service.create('test');
        const todoList = await service.search('test');

        expect(todoList).not.toHaveLength(0);
    });

    it('should throw an error', async () => {
        await expect(service.toggleStatus(10)).rejects.toThrow('Todo not found.');
    })
});

describe('Unit tests for repository', () => {
    interface Entity { id: number; name: string; }
    const repo = new InMemoryRepository<Entity>();

    afterEach(() => {
        repo.remove(1);
      });

    it('should add and find all items correctly', () => {
        repo.add({id: 1, name: "Alex"});
        repo.add({id: 2, name: "Svetlana"});
        const result = repo.findAll();

        expect(result.length).toEqual(2);
        repo.remove(2);
    });

    it('should find item by id correctly', () => {
        repo.add({id: 1, name: "Katya"});
        const result = repo.findById(1);

        expect(result.name).toBe("Katya");
    });

    it('should update item correctly', () => {
        repo.add({id: 1, name: "Veronika"});
        repo.update(1, { name: "Nika" });
        const result = repo.findById(1);

        expect(result.name).toEqual("Nika");
    });

    it('should remove item correctly', () => {
        repo.add({id: 1, name: "Nikita"});
        repo.add({id: 2, name: "Nikitos"});
        repo.remove(2);
        const result = repo.findAll();

        expect(result.length).toBe(1);
    });
});