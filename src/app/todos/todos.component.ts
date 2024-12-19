import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,

  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([])
  ngOnInit(): void {
    // console.log(this.todoService.todoItems);
    this.todoService.getTodosFromAPi().pipe(
      catchError((err) => {
        console.log(err);
        return [];
      })
    ).subscribe((todos) => {
      this.todoItems.set(todos)
    })
    
  }

}
