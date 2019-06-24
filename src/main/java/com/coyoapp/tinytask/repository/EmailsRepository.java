package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Emails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailsRepository extends JpaRepository<Emails, String> {

  Emails findByUsername(String username);
}
