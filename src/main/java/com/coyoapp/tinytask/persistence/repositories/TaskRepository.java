package com.coyoapp.tinytask.persistence.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.coyoapp.tinytask.persistence.entities.TaskEntity;

@Repository
@Transactional
public interface TaskRepository extends CrudRepository<TaskEntity, Integer>{

}
