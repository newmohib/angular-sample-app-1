import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';

@Pipe({
  name: 'filterTodos',
  standalone: true,
})
export class FilterTodosPipe implements PipeTransform {
  transform(todos: Todo[], serchTerm: string): Todo[] {
    if (serchTerm) {
      return todos.filter((todo) =>
        todo.title.toLowerCase().includes(serchTerm.toLowerCase())
      );
    }
    return todos;
  }
}
