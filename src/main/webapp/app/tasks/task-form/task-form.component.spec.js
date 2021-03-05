"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var task_form_component_1 = require("./task-form.component");
describe('TaskFormComponent', function () {
    var component;
    var fixture;
    var taskService;
    beforeEach(testing_1.waitForAsync(function () {
        taskService = jasmine.createSpyObj('taskService', ['create']);
        testing_1.TestBed.configureTestingModule({
            declarations: [task_form_component_1.TaskFormComponent],
            providers: [{
                    provide: 'TaskService',
                    useValue: taskService
                }]
        }).overrideTemplate(task_form_component_1.TaskFormComponent, '')
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(task_form_component_1.TaskFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should validate a task', function () {
        expect(component.taskForm.invalid).toBe(true);
        component.taskForm.setValue({ name: 'My task' });
        expect(component.taskForm.invalid).toBe(false);
    });
    it('should create a task', function () {
        // given
        component.taskForm.setValue({ name: 'My task' });
        taskService.create.and.returnValue(rxjs_1.of({ id: 'id', name: 'My task' }));
        // when
        component.onSubmit();
        // then
        expect(taskService.create).toHaveBeenCalledWith('My task');
    });
    it('should emit the task after creation', function () {
        // given
        component.taskForm.setValue({ name: 'My task' });
        taskService.create.and.returnValue(rxjs_1.of({ id: 'id', name: 'My task' }));
        var createEmitter = spyOn(component.created, 'emit');
        // when
        component.onSubmit();
        // then
        expect(createEmitter).toHaveBeenCalledWith({ id: 'id', name: 'My task' });
    });
    it('should reset the form after creation', function () {
        // given
        component.taskForm.setValue({ name: 'My task' });
        taskService.create.and.returnValue(rxjs_1.of({ id: 'id', name: 'My task' }));
        var formReset = spyOn(component.taskForm, 'reset');
        // when
        component.onSubmit();
        // then
        expect(formReset).toHaveBeenCalled();
    });
    it('should search a task', function () {
        // given
        component.taskForm.setValue({ searchTxt: 'name or id' });
        // when
        component.onSearch();
        // then
        expect(taskService.readTasksByNameAndId).toHaveBeenCalledWith('name or id');
    });
    it('should clear a search', function () {
        // given
        component.taskForm.setValue({ searchTxt: 'name or id' });
        var searchEmitter = spyOn(component.clearedSearch, 'emit');
        // when
        component.onSearch();
        // then
        expect(searchEmitter).toHaveBeenCalled();
    });
});
//# sourceMappingURL=task-form.component.spec.js.map