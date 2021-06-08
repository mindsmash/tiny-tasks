import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSearchComponent {
  taskSearch: string;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('q')) {
        this.taskSearch = params.get('q');
      }
    });
  }


  resetSearch(): void {
    this.taskSearch = '';
  }

  onSearchUpdate(): void {
    this.router.navigate(
      [],
      {
        queryParams: {
          q: this.taskSearch
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }
    );
  }
}
