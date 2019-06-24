package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Emails;

public interface EmailsService {

  Emails getEmailByUsername(String username);

}
