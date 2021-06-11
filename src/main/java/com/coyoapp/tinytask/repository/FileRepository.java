package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, String> {
}
