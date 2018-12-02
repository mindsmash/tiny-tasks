import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatIconModule, MatCheckboxModule } from '@angular/material';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should reset task input after adding task', async(() => {
    app.inputValue = 'test';

    app.add('test');

    expect(app.inputValue).toBe('');
  }));
});
