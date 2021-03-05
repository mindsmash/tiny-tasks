"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var app_component_1 = require("./app.component");
describe('AppComponent', function () {
    var fixture;
    var component;
    var taskService;
    beforeEach(testing_1.waitForAsync(function () {
        taskService = jasmine.createSpyObj('TaskService', ['getAll']);
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent],
            providers: [{
                    provide: 'TaskService',
                    useValue: taskService
                }]
        }).overrideTemplate(app_component_1.AppComponent, '')
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', testing_1.waitForAsync(function () {
        expect(component).toBeTruthy();
    }));
    it('should init the tasks', function () {
        // given
        var tasks$ = rxjs_1.of([]);
        taskService.getAll.and.returnValue(tasks$);
        // when
        component.ngOnInit();
        // then
        expect(component.tasks$).toEqual(tasks$);
    });
    it('should reload the tasks after task creation', function () {
        // given
        var tasks$ = rxjs_1.of([]);
        taskService.getAll.and.returnValue(tasks$);
        // when
        component.created();
        // then
        expect(component.tasks$).toEqual(tasks$);
        expect(taskService.getAll).toHaveBeenCalled();
    });
    it('should reload the tasks after task deletion', function () {
        // given
        var tasks$ = rxjs_1.of([]);
        taskService.getAll.and.returnValue(tasks$);
        // when
        component.deleted();
        // then
        expect(component.tasks$).toEqual(tasks$);
        expect(taskService.getAll).toHaveBeenCalled();
    });
    it('should reload all tasks after search cleared', function () {
      // given
      var tasks$ = rxjs_1.of([]);
      taskService.getAll.and.returnValue(tasks$);
      // when
      component.clearedSearch();
      // then
      expect(component.tasks$).toEqual(tasks$);
      expect(taskService.getAll).toHaveBeenCalled();
    });

  it('should search tasks after search button click', function () {
    // given
    var tasks$ = rxjs_1.of([]);
    taskService.getAll.and.returnValue(tasks$);
    // when
    component.searched();
    // then
    expect(component.tasks$).toEqual(tasks$);
    expect(taskService.readTasksByNameAndId).toHaveBeenCalled();
  });
});
//# sourceMappingURL=app.component.spec.js.map
