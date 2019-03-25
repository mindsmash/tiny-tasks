package com.coyoapp.tinytask;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.utility.InitialTaskLoader;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskRepositoryTest {

  @Autowired
  private TaskRepository repository;

  @Test
  public void initial_data_loaded(){
   // in the utility/initialTaskLoader, loading 5 Tasks to the Db.

    InitialTaskLoader.init(repository);
    List<Task> tasks = repository.findAll();
    System.out.println("Size of tasks list: " + tasks.size());
    assert tasks.size() == 5;
  }

  @After
  public void cleanup(){
    repository.deleteAll();
  }

}
