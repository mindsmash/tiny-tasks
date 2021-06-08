import {Component, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('q')) {
        this.taskSearch.setValue({name : params.get('q')});
      }
    });
  }

  resetSearch(): void {
    this.taskSearch.reset();
  }
}
