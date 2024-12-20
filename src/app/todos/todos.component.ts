import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  serchTerm = signal('');

  ngOnInit(): void {
    // console.log(this.todoService.todoItems);
    this.todoService
      .getTodosFromAPi()
      .pipe(
        catchError((err) => {
          console.log(err);
          return [];
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      });

    // this.todoItems.set(this.todoService.todoItems);
  }
  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return { ...todo, completed: !todoItem.completed };
        }
        return todo;
      });
    });
  }
}
