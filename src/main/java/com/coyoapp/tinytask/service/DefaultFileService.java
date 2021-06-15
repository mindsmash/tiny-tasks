package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.exception.FileNotFoundException;
import com.coyoapp.tinytask.helper.FileHelper;
import com.coyoapp.tinytask.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultFileService implements FileService {
  private final FileRepository fileRepository;
  private final FileHelper fileHelper;

  @Override
  @Transactional
  public FileResponse createFile(MultipartFile multipartFile, Task task) {
    log.debug("createFile(createFile={}, task={})", multipartFile, task);
    File file = fileHelper.fileRequestToFile(multipartFile, task);
    return fileHelper.fileToResponse(fileRepository.save(file));
  }


  @Override
  @Transactional
  public void deleteFile(String fileId) {
    log.debug("deleteTask(taskId={})", fileId);
    fileRepository.delete(getFileOrThrowException(fileId));
  }

  @Override
  @Transactional(readOnly = true)
  public File getFile(String fileId) {
    log.debug("getFile(fileId={})", fileId);
    return getFileOrThrowException(fileId);
  }


  private File getFileOrThrowException(String fileId) {
    return fileRepository.findById(fileId).orElseThrow(FileNotFoundException::new);
  }

}
