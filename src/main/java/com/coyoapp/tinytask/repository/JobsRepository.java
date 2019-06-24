package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobsRepository extends JpaRepository<Jobs, String> {

  Jobs findByUsername(String username);
}
