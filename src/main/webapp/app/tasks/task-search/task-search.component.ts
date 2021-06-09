import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSearchComponent {
  taskSearchControl = new FormControl();
  private readonly routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.routerSubscription = this.route.queryParamMap.subscribe(params => {
      if (params.get('q')) {
        this.taskSearchControl.setValue(params.get('q'));
      }
      if (this.routerSubscription) {
        // preventing redundant callbacks by unsubscribing
        this.routerSubscription.unsubscribe();
      }
    });

    this.taskSearchControl.valueChanges.subscribe(() => {
      this.onSearchUpdate();
    });
  }

  resetSearch(): void {
    this.taskSearchControl.reset();
    this.onSearchUpdate();
  }

  onSearchUpdate(): void {
    this.router.navigate(
      [],
      {
        queryParams: {
          q: this.taskSearchControl.value
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }
    );
  }
}
