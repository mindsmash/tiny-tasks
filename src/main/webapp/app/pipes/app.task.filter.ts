import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "app/tasks/task";
import * as _ from "cypress/types/lodash";
import { isArray } from "cypress/types/lodash";

@Pipe ({ name: 'taskFilter'})

export class TaskFilter implements PipeTransform {
  
  searchPattern =  /\[.*?\]/g;
  transform(tasks: Task[], searchTerms: string): any[] {
    if (!tasks) {
      return [];
    }
    if (!searchTerms) {
      return tasks;
    }
    searchTerms = searchTerms.trim();

    if(this.usePattern(searchTerms))
    {
      return this.applyPatternFilter(tasks, searchTerms);
    }
    else
    {
      return this.applyStandardFilter(tasks, searchTerms);
    }
  }

  private applyPatternFilter(tasks: Task[], searchTerms: string): Task[]
  {
    let sanitizedTerms = searchTerms.split(' ').filter((a)=> a !== '');
    let filteredTask = tasks;
    let compoundingFilter = Array<Task>();
    let operator: string;

    sanitizedTerms.forEach((term) => {
        switch(term.toUpperCase()){
          case '[AND]':
            operator = '[AND]';
            break;

          case '[OR]':
            operator = '[OR]'
            break;

          default:
            if(operator == '[AND]'){
              filteredTask = this.applyStandardFilter(filteredTask, term);
            }
            else{
              let filtered = this.applyStandardFilter(tasks, term);
              compoundingFilter = compoundingFilter.length == 0 ? filtered : compoundingFilter.concat(filtered);
              filteredTask = compoundingFilter;
             break;
        }
      }
    });
    let result = filteredTask.filter(function(item, index) {
      if (filteredTask.indexOf(item) == index) return item;
    });

    return result;
  }

  private applyStandardFilter(tasks: Task[], searchTerms: string): Task[]
  {
    return tasks.filter(item => {
      return item.name.toLocaleLowerCase().includes(searchTerms.toLowerCase());
    });
  }

  private usePattern(searchTerms: string): boolean{
    let patternFound: boolean = false;
    patternFound =  this.searchPattern.test(searchTerms);
    return patternFound; 
  }

}

