package com.coyoapp.tinytask.serviceimpl;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.domain.UserTask;
import com.coyoapp.tinytask.dto.UserTaskRequest;
import com.coyoapp.tinytask.exception.UserTaskNotFoundException;
import com.coyoapp.tinytask.repository.UserTaskRepository;
import com.coyoapp.tinytask.service.UserTaskService;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserTaskServiceImpl implements UserTaskService {

  private final UserTaskRepository userTaskRepository;

  @Override
  @Transactional(readOnly = true)
  public List<UserTask> getTasksWillNotifiedByUsers(User user) {
    log.debug("getTasksWillNotifiedByUsers({})", user);
    LocalDateTime localDateTime = LocalDateTime.now();
    Integer period = user.getUserNotificationPeriodInHours();
    if (period!= null && period > 0) {
      localDateTime = localDateTime.minusHours(period);
    }
    return userTaskRepository.findAllTasksHasToBeNotifiedByUser(user, localDateTime);
  }

  @Override
  @Transactional
  public void saveAll(List<UserTask> userTasks) {
    userTaskRepository.saveAll(userTasks);
  }

  @Override
  @Transactional
  public UserTask finishUserTask(String userTaskId) {
    UserTask userTask = userTaskRepository.findById(userTaskId).orElseThrow(() -> new UserTaskNotFoundException(userTaskId));
    userTask.setIsDone(true);
    return userTaskRepository.save(userTask);
  }

  @Override
  @Transactional
  public void deleteUserTask(String userTaskId) {
    userTaskRepository.deleteById(userTaskId);
  }

  @Override
  @Transactional(readOnly = true)
  public List<UserTask> getAllUserTasks() {
    return userTaskRepository.findAll();
  }

  @Override
  @Transactional(readOnly = true)
  public List<UserTask> getAllUserTasksByUserId(String userId) {
    log.debug("userTaskRepository.findByUserId({})", userId);
    return userTaskRepository.findByUserId(userId);
  }

  @Override
  @Transactional
  public UserTask assignNewTask(UserTaskRequest userTaskRequest) {
    UserTask userTask = new UserTask();
    userTask.setUser(new User(userTaskRequest.getUserId()));
    userTask.setTask(new Task(userTaskRequest.getTaskId()));
    userTask.setDueDate(userTaskRequest.getDueDate());
    return userTaskRepository.save(userTask);
  }
}
