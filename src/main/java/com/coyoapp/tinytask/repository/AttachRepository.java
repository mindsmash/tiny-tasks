package com.coyoapp.tinytask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coyoapp.tinytask.domain.Attach;

public interface AttachRepository extends JpaRepository<Attach, String> {

}
