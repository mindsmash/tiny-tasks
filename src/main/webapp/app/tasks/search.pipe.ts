import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  evaluateConditionalSearch(tasks: Task[], searchQuery): Task[] {
    if (searchQuery.indexOf(' AND ') !== -1 && searchQuery.indexOf(' OR ') !== -1) {
      /**
       * 1. split searchQuery using ' OR ' to get optional queries
       * 2. if searchQuery does not contain any OR conditions then 1 sub-query will have all AND conditions
       * 2. iterate through sub-queries and check if sub-queries have any more conditions, if yes then evaluate using sub-query
       * 3. if no, then concat search results and return final result
       */
      const querySets = searchQuery.split(' OR ');
      return querySets.reduce((results: Task[], query) => {
        if (query.indexOf(' AND ') !== -1 || query.indexOf(' OR ') !== -1) {
          return results.concat(this.evaluateConditionalSearch(tasks, query));
        }
        return results.concat(tasks.filter(task => task.name.toLowerCase().indexOf(query.toLowerCase()) !== -1));
      }, []);
    } else if (searchQuery.indexOf(' AND ') !== -1) {
      /**
       * 1. split the search query from ' AND ' into multiple queries to get all the conditions
       * 2. filter tasks for query, return result as accumulator
       * 3. filter again from filtered result for next query and return the end result
       */
      const queries = searchQuery.split(' AND ');
      return queries.reduce((results: Task[], query) =>
        results.filter(task => task.name.toLowerCase().indexOf(query.toLowerCase()) !== -1), tasks);
    } else if (searchQuery.indexOf(' OR ') !== -1) {
      /**
       * 1. split the search query from ' OR ' into multiple queries to get all the conditions
       * 2. filter tasks for query, add results to accumulator
       * 3. filter tasks again for next query and return the end result
       */
      const queries = searchQuery.split(' OR ');
      return queries.reduce((results: Task[], query) =>
        results.concat(tasks.filter(task => task.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)), []);
    }
  }

  transform(tasks: Task[], searchQuery: string): Task[] {
    if (searchQuery.indexOf(' AND ') !== -1 || searchQuery.indexOf(' OR ') !== -1) {
      return this.evaluateConditionalSearch(tasks, searchQuery);
    } else if (searchQuery) {
      return tasks.filter(task => task.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
    }
    return tasks;
  }

}
