package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.exception.FileNotFoundException;
import com.coyoapp.tinytask.helper.FileHelper;
import com.coyoapp.tinytask.repository.FileRepository;
import ma.glasnost.orika.MapperFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DefaultFileServiceTest {

  @Mock
  private FileRepository fileRepository;

  @Mock
  private FileHelper fileHelper;

  @InjectMocks
  private DefaultFileService objectUnderTest;

  @Test
  void shouldCreateFile() {
    // given
    MultipartFile incomingFile = mock(MultipartFile.class);
    File file = mock(File.class);
    Task task = mock(Task.class);
    File savedFile = mock(File.class);
    FileResponse fileResponse = mock(FileResponse.class);
    doReturn(file).when(fileHelper).fileRequestToFile(incomingFile, task);
    doReturn(savedFile).when(fileRepository).save(file);
    doReturn(fileResponse).when(fileHelper).fileToResponse(savedFile);

    // when
    FileResponse actualResponse = objectUnderTest.createFile(incomingFile, task);

    // then
    assertThat(actualResponse).isEqualTo(fileResponse);
  }

  @Test
  void shouldGetFile() {
    // given
    File file = mock(File.class);
    FileResponse fileResponse = mock(FileResponse.class);
    String id = "file-id";
    when(fileRepository.findById(id)).thenReturn(Optional.of(file));

    // when
    File actualFile = objectUnderTest.getFile(id);

    // then
    assertThat(actualFile).isEqualTo(file);
  }

  @Test
  void shouldDeleteFile() {
    // given
    String id = "file-id";
    File task = mock(File.class);
    when(fileRepository.findById(id)).thenReturn(Optional.of(task));

    // when
    objectUnderTest.deleteFile(id);

    // then
    verify(fileRepository).delete(task);
  }

  @Test
  void shouldNotDeleteFile() {
    // given
    String id = "file-id";
    when(fileRepository.findById(id)).thenReturn(Optional.empty());

    // when
    Throwable thrown = catchThrowable(() -> objectUnderTest.deleteFile(id));

    // then
    assertThat(thrown).isInstanceOf(FileNotFoundException.class);
  }

}
