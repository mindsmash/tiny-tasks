package com.coyoapp.tinytask.utility;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class InitialTaskLoader {

    @Bean
    public static ApplicationRunner init(TaskRepository repository) {
    return args ->
    {
      Stream.of("Do this", "Then that", "Do this as well", "This too", "Maybe that too")
        .forEach(name -> {
        Task task = TaskProvisioner.aSingleCustomTask(name);
        repository.save(task);
      });
      repository.findAll().forEach(task -> System.out.println(
          "Task name: " + task.getName() +
          "Task Id: " + task.getId()
            + "\n")
      );
    };
  }
}
