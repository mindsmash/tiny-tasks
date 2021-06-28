package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Customer;


import com.coyoapp.tinytask.domain.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
	
	@Query(nativeQuery = true,value="SELECT * FROM task u WHERE u.customer_id =:userid")
	List <Task> findByCustomerId (@Param(value = "userid") long userid);
}
