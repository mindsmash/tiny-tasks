package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileRequest;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.exception.FileNotFoundException;
import com.coyoapp.tinytask.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultFileService implements FileService {
  private final FileRepository fileRepository;
  private final MapperFacade mapperFacade;

  @Override
  @Transactional
  public FileResponse createFile(MultipartFile multipartFile, Task task) {
    log.debug("createFile(createFile={}, task={})", multipartFile, task);
    String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename()); // todo catch null
    File file = new File();
    file.setName(fileName);
    file.setTask(task);
    try {
      file.setContent(multipartFile.getBytes());
    } catch (Exception e){

    }
    file.setType(multipartFile.getContentType());

    return transformToResponse(fileRepository.save(file));
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

  public FileResponse transformToResponse(File file) {
    return mapperFacade.map(file, FileResponse.class);
  }

  private File getFileOrThrowException(String fileId) {
    return fileRepository.findById(fileId).orElseThrow(FileNotFoundException::new);
  }

}
