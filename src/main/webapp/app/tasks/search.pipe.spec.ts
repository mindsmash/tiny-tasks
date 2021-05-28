import { SearchPipe } from './search.pipe';
import { Task } from './task';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  describe('Transform method', () => {
    const pipe = new SearchPipe();
    const tasks: Task[] = [
      { id: '1', name: 'Create SearchComponent' },
      { id: '2', name: 'Use SearchComponent in App' },
      { id: '3', name: 'Pass Search Query via output to app' },
      { id: '4', name: 'Create SearchPipe' },
      { id: '5', name: 'Apply SearchPipe to tasks' },
      { id: '6', name: 'Pass searchQuery to SearchPipe' },
    ];

    it('should perform basic search', () => {
      const searchQuery = 'com';
      const searchResults = pipe.transform(tasks, searchQuery);
      const correctSearchResults: Task[] = [
        { id: '1', name: 'Create SearchComponent' },
        { id: '2', name: 'Use SearchComponent in App' }
      ];
      expect(searchResults).toEqual(correctSearchResults);
    });

    it('should perform AND operator search', () => {
      const searchQuery = 'com AND pip';
      const searchResults = pipe.transform(tasks, searchQuery);
      const correctSearchResults: Task[] = [];
      expect(searchResults).toEqual(correctSearchResults);
    });

    it('should perform OR operator search', () => {
      const searchQuery = 'com OR pip';
      const searchResults = pipe.transform(tasks, searchQuery);
      const correctSearchResults: Task[] = [
        { id: '1', name: 'Create SearchComponent' },
        { id: '2', name: 'Use SearchComponent in App' },
        { id: '4', name: 'Create SearchPipe' },
        { id: '5', name: 'Apply SearchPipe to tasks' },
        { id: '6', name: 'Pass searchQuery to SearchPipe' },
      ];
      expect(searchResults).toEqual(correctSearchResults);
    });

    it('should perform combined AND and OR operator search', () => {
      const searchQuery = 'com OR pip AND task';
      const searchResults = pipe.transform(tasks, searchQuery);
      const correctSearchResults: Task[] = [
        { id: '1', name: 'Create SearchComponent' },
        { id: '2', name: 'Use SearchComponent in App' },
        { id: '5', name: 'Apply SearchPipe to tasks' }
      ];
      expect(searchResults).toEqual(correctSearchResults);
    });
  });
});
