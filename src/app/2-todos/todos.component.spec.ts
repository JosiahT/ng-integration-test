/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

// NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not
// provided the TodoService as a dependency to TodosComponent.
//
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below.

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ TodosComponent ],
      providers: [TodoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  /*it('should load todos from the server', () => { // for observable
    let service = TestBed.get(TodoService); // get a reference to the service dependency registered at the module level
    // this option works if you provide the dependency at the module level (e.g. app.module.ts) - singleton
    // tslint:disable-next-line:max-line-length
    // let service = fixture.debugElement.injector.get(TodoService); // get a dependency from the component directly if injected as a provider for that component
    spyOn(service, 'getTodos').and.returnValue(Observable.from([ [1, 2, 3] ]));

    fixture.detectChanges();

    expect(component.todos.length).toBe(3);
    // expect(component).toBeTruthy();
  });*/

  it('should load todos from the server', fakeAsync(() => { // for promise
    let service = TestBed.get(TodoService); // get a reference to the service dependency registered at the module level
    // this option works if you provide the dependency at the module level (e.g. app.module.ts) - singleton
    // tslint:disable-next-line:max-line-length
    // let service = fixture.debugElement.injector.get(TodoService); // get a dependency from the component directly if injected as a provider for that component
    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1, 2, 3]));

    fixture.detectChanges();

    tick(); // this simulates the passage of time
    expect(component.todos.length).toBe(3);
    /*gives error saying Expected 0 to be 3. The reason for this is the promise callback function is not executed immidiately.
    It's put in a queue and the javascript execution engine will look at that queue after the current thread of execution completes.
    Which means Pomise is executed after expect is called. Same thing happens to timer functions like setTimeout(() => { ... } )
    We don't have this problem when using an observable because the callback function we pass to the subscribe method gets executed
     immediately. Even though the data in the observable is going to arrive in the future, we're going to subscribe to it immediately.
     To solve this issue for promises, we wrap the whole function in an async function
    */
  }));
});
