/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should load todos from the server', () => {
    let service = TestBed.get(TodoService); // get a reference to the service dependency registered at the module level
    // this option works if you provide the dependency at the module level (e.g. app.module.ts) - singleton
    // tslint:disable-next-line:max-line-length
    // let service = fixture.debugElement.injector.get(TodoService); // get a dependency from the component directly if injected as a provider for that component
    spyOn(service, 'getTodos').and.returnValue(Observable.from([ [1, 2, 3] ]));

    fixture.detectChanges();

    expect(component.todos.length).toBe(3);
    // expect(component).toBeTruthy();
  });
});
