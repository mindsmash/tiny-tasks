package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, String> {
  List<Account> findAll();
}
