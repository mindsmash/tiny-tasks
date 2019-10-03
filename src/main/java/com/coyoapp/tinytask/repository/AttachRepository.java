package com.coyoapp.tinytask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.coyoapp.tinytask.domain.Attach;

public interface AttachRepository extends JpaRepository<Attach, String> {

	@Transactional(readOnly = true)
	@Query("SELECT a FROM Task t JOIN t.attach a WHERE t.id = :taskId")
	Attach findAttachBinByIdTask(@Param("taskId") String taskId);

}
