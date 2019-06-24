package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Emails;
import com.coyoapp.tinytask.domain.Jobs;
import com.coyoapp.tinytask.repository.EmailsRepository;
import com.coyoapp.tinytask.service.EmailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailsServiceImpl implements EmailsService {

  private final EmailsRepository emailsRepository;

  @Override
  public Emails getEmailByUsername(String username) {
    return emailsRepository.findByUsername(username);
  }
}
