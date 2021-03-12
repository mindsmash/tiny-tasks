import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BASE_URL } from './app.tokens';
import { DefaultTaskService } from './tasks/default-task.service';
import { LocalTaskService } from './tasks/local-task.service';
import { TasksModule } from './tasks/tasks.module';
import { CancellationApprovalBottomSheetComponent } from './cancellation-approval-bottom-sheet/cancellation-approval-bottom-sheet.component';

@NgModule({
  declarations: [AppComponent, CancellationApprovalBottomSheetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    TasksModule,
    HttpClientModule
  ],
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost:8080' },
    { provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService }
  ],
  entryComponents: [
    CancellationApprovalBottomSheetComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
