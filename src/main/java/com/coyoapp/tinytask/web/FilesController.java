package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.FileRequest;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
 class FilesController {

  private final FileService fileService;

  @PostMapping(path = "/{taskId}")
  public FileResponse createFile(@RequestBody @Valid FileRequest fileRequest) {
    log.debug("createFile(fileRequest={})", fileRequest);
    return fileService.createFile(fileRequest);
  }

  @GetMapping(path ="/{taskId}")
  public List<FileResponse> getFileForTasks(String taskId) {
    log.debug("getFilesForTask(taskId={})", taskId);
    return fileService.getFilesForTask(taskId);
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{fileId}")
  public void deleteFile(@PathVariable String fileId) {
    log.debug("deleteFile(fileId={})", fileId);
    fileService.deleteFile(fileId);
  }

  @GetMapping
  public List<FileResponse> getFiles() {
    log.debug("getFiles()");
    return fileService.getFiles();
  }

}
