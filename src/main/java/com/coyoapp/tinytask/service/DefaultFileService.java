package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.dto.FileRequest;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.FileNotFoundException;
import com.coyoapp.tinytask.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;

import org.springframework.transaction.annotation.Transactional;

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
  public FileResponse createFile(FileRequest fileRequest) {
    log.debug("createFile(createFile={}", fileRequest);
    File file = mapperFacade.map(fileRequest, File.class);
    return transformToResponse(fileRepository.save(file));
  }

  @Override
  @Transactional(readOnly = true)
  public List<FileResponse> getFilesForTask(String taskId) {
    log.debug("getFilesForTask(taskId = {}", taskId);
    // todo how to resolve foreign key
    return null;
  }

  @Override
  @Transactional
  public void deleteFile(String fileId) {
    log.debug("deleteTask(taskId={})", fileId);
    fileRepository.delete(getFileOrThrowException(fileId));
  }

  @Override
  @Transactional(readOnly = true)
  public List<FileResponse> getFiles() {
    log.debug("getFile()");
    return fileRepository.findAll().stream().map(this::transformToResponse).collect(toList());
  }

  private FileResponse transformToResponse(File file) {
    return mapperFacade.map(file, FileResponse.class);
  }

  private File getFileOrThrowException(String fileId) {
    return fileRepository.findById(fileId).orElseThrow(FileNotFoundException::new);
  }

}
