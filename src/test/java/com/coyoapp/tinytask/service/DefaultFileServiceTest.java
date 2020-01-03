package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.exception.FileException;
import com.coyoapp.tinytask.repository.FileRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.quality.Strictness;

import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

public class DefaultFileServiceTest {
  @Rule
  public MockitoRule mockitoRule = MockitoJUnit.rule().strictness(Strictness.STRICT_STUBS);

  @Mock
  private FileRepository fileRepository;

  @InjectMocks
  private DefaultFileService objectUnderTest;

  @Rule
  public TemporaryFolder baseFileDir = new TemporaryFolder();

  @Test
  public void shouldReadFromRepo() {
    //when
    when(fileRepository.getImageByName(any())).thenReturn(Optional.of("a".getBytes()));

    //then
    assertThat(objectUnderTest.getFile(null), is("a".getBytes()));
  }

  @Test(expected = FileException.class)
  public void shouldFail() {
    // given
    when(fileRepository.getImageByName((any()))).thenReturn(Optional.empty());

    // when
    objectUnderTest.getFile(null);

    //then
    //exception thrown
  }
}
