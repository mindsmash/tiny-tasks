"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var task_list_component_1 = require("./task-list.component");
describe('TaskListComponent', function () {
    var component;
    var fixture;
    var taskService;
    beforeEach(testing_1.waitForAsync(function () {
        taskService = jasmine.createSpyObj('taskService', ['delete']);
        testing_1.TestBed.configureTestingModule({
            declarations: [task_list_component_1.TaskListComponent],
            providers: [{
                    provide: 'TaskService',
                    useValue: taskService
                }]
        }).overrideTemplate(task_list_component_1.TaskListComponent, '')
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(task_list_component_1.TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should delete a task', function () {
        // given
        taskService.delete.and.returnValue(rxjs_1.of(null));
        // when
        component.delete({ id: 'id', name: 'My task' });
        // then
        expect(taskService.delete).toHaveBeenCalledWith('id');
    });
    it('should emit the task after deletion', function () {
        // given
        taskService.delete.and.returnValue(rxjs_1.of(null));
        var deleteEmitter = spyOn(component.deleted, 'emit');
        // when
        component.delete({ id: 'id', name: 'My task' });
        // then
        expect(deleteEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task' });
    });
});
//# sourceMappingURL=task-list.component.spec.js.map