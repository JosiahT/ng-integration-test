/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ], // in place of RouterModule to test the router-outlet directive
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ] /*tells angular to ignore any elements or attributes that it doesn't recognize 
      but the issue with this is if you made a mistake on any of the components 
      not recognized then the error wont be catched since you instructed angular to ingore the component */
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet)); // get a reference to the <router-outlet> element

    expect(de).not.toBeNull(); // assert the reference is not null
  });
});
