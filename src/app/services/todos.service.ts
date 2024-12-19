import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient) // first need to add httpclint into app.congis.ts file as a provider
  // todoItems: Array<Todo> = [
  //   { id: 1, title: 'Todo 1', completed: false, userId: 1 },
  //   { id: 2, title: 'Todo 2', completed: false, userId: 1 },
  //   { id: 3, title: 'Todo 3', completed: false, userId: 1 } 
  // ]


  getTodosFromAPi(){
    const url = 'https://jsonplaceholder.typicode.com/todos'
    return this.http.get<Todo[]>(url)
    // return this.http.get<Array<Todo>>(url)
  }
}
