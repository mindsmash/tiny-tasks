package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.TaskStatusRequest;
import com.coyoapp.tinytask.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
        //log.debug("createTask(createTask={})", taskRequest);
        return taskService.createTask(taskRequest);
    }

    @PutMapping(value = "/{taskId}")
    public TaskResponse updateTaskStatus(@PathVariable("taskId") String taksId,
                                         @RequestBody @Valid TaskStatusRequest request) {
        //log.debug("updateTaskStatus(createTask={})", taskRequest);
        return taskService.updateTaskStatus(taksId, request);
    }

    @GetMapping
    public List<TaskResponse> getTasks() {
        //log.debug("getTasks()");
        return taskService.getTasks();
    }

    @GetMapping(value = "/ordered")
    public List<TaskResponse> getTasksOrders() {
        //log.debug("getTasks()");
        return taskService.getTasksOrdered();
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(path = "/{taskId}")
    public void deleteTask(@PathVariable String taskId) {
        //log.debug("deleteTask(taskId={})", taskId);
        taskService.deleteTask(taskId);
    }


    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping
    public void deleteTaskByDone(@RequestParam("done") String done) {
        //log.debug("deleteTaskByDone(taskId={})", taskId);
        taskService.deleteTaskByDone(done);
    }
}
