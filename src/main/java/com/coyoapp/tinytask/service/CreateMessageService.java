package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import lombok.RequiredArgsConstructor;

// Create the message that should be send via E-Mail
@Component
@RequiredArgsConstructor
public class CreateMessageService {

    // Connect to TaskSerivce
    @Autowired
    private final TaskService taskService;

    // Get content for E-Mail
    public String getContent() {

        // Create empty message
        String message = "";

        // Get all tasks
        List<TaskResponse> tasks = taskService.getTasks();

        // Iterate over tasks, select open ones and put each one in a seperate line of
        // the message
        for (int i = 0; i < tasks.size(); i++) {

            if (tasks.get(i).getState() == 0)

                message = message + "Open Task: " + tasks.get(i).getName() + "\n";
        }
        return message;
    }

}
