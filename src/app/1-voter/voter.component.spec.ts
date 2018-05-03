import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
  });
  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges(); // we need to explicitly tell angular to detect changes

    // query the DOM to get the tag that displays total votes with the fixture wrapper
    let de = fixture.debugElement.query(By.css('.vote-count')); // wrapper for the native html element we queried
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('21');
  });

  it('should highlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up')); // wrapper for the native html element we queried

    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should increase total votes when I click the upvote button', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1);
  });
});
