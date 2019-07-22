package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser,String> {
}
