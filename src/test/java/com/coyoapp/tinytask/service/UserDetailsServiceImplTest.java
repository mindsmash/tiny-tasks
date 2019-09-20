package com.coyoapp.tinytask.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import java.util.Arrays;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.userdetails.UserDetails;

@RunWith(MockitoJUnitRunner.class)
public class UserDetailsServiceImplTest {

  @InjectMocks
  private UserDetailsServiceImpl userDetailsService;

  @Mock
  private UserRepository userRepository;

  @Test
  public void should_return_user_details_for_given_username() {
    Task task = mock(Task.class);
    given(userRepository.findByUsername(anyString()))
      .willReturn(Optional.of(new User("123", "test", "hunter2", Arrays.asList(task))));

    final UserDetails result = userDetailsService.loadUserByUsername("test");

    assertThat(result).isEqualTo(new UserDetailsImpl("123", "test", "hunter2"));
  }

  @Test(expected = EntityNotFoundException.class)
  public void should_throw_exception_when_user_is_not_found() {
    given(userRepository.findByUsername(anyString()))
      .willReturn(Optional.empty());

    final UserDetails result = userDetailsService.loadUserByUsername("testUser");
  }
}
