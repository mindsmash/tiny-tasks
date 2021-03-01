import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskSearchComponent } from './task-search.component';
import { ActivatedRoute } from '@angular/router';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, RouterTestingModule ],
      declarations: [ TaskSearchComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({q: 'task'})
          }
        }
      ]
    }).overrideTemplate(TaskSearchComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search string', () => {
    // given
    const searcEmitter = spyOn(component.searched, 'emit');
    
    // when
    component.searchInputFormControl.patchValue('code');

    // then
    expect(searcEmitter).toHaveBeenCalledWith('code');
  });

  it('should clear the search ', () => {
    // given
    const searcEmitter = spyOn(component.searched, 'emit');
    
    // when
    component.searchInputFormControl.reset();

    // then
    expect(searcEmitter).toHaveBeenCalledWith('');
  });

  it('should call the search with query parameters', () => {
    // given
    const searcEmitter = spyOn(component.searched, 'emit');
    
    // when
    component.ngOnInit();

    // then
    expect(component.searchInputFormControl.value).toEqual('task');
    expect(searcEmitter).toHaveBeenCalledWith('task');
  });
});
