import { Injectable } from '@nestjs/common';

type Todo =
  | {
      id: string;
      text: string;
      done: boolean;
    }
  | {
      id?: string;
      text?: string;
      done?: boolean;
    };

@Injectable()
export class AppService {
  private todos: Todo[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  get(id: string): Todo {
    return this.todos.filter((i) => i.id === id)[0];
  }

  update(id: string, args: Todo): Todo {
    const index = this.todos.findIndex((item) => item.id === id);
    const updated = { ...this.todos[index], ...args };
    this.todos[index] = updated;

    return updated;
  }

  create(args: Todo): Todo {
    this.todos = [...this.todos, args];

    return args;
  }

  all(): Todo[] {
    return this.todos;
  }
}
