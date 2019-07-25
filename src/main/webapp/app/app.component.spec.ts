import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { TaskService } from './tasks/task.service';
import {LoginComponent} from "app/components/login/login.component";

// describe('AppComponent', () => {
//   let fixture: ComponentFixture<AppComponent>;
//   let component: AppComponent;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ LoginComponent ]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
