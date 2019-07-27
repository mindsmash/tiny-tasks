package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {
	
	@Query("select new com.coyoapp.tinytask.dto.UserTask(t.name, a.name, a.email)" +
		    " from Task t left outer join t.owner a")
		  List<UserTask> getByDueDateTimeBeforeAndCompleted(ZonedDateTime dueDateTime, boolean completed);
}
