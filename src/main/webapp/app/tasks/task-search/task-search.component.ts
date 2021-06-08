import {Component, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent {
  @Output()
  taskSearch: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('q')) {
        this.taskSearch.setValue({name: params.get('q')});
      }
    });

    this.taskSearch.valueChanges.subscribe(value => {
      this.router.navigate(
        [],
        {
          queryParams: {
            q: value.name
          },
          queryParamsHandling: 'merge',
          replaceUrl: true
        }
      );
    });
  }

  resetSearch(): void {
    this.taskSearch.reset();
  }
}
