package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

  private final FileService fileService;

  @GetMapping(path = "/{fileName:.+}")
  public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
    log.debug("getFile(fileName={})", fileName);
    ByteArrayResource resource = new ByteArrayResource(fileService.getFile(fileName));
    return ResponseEntity
      .ok()
      .header("Content-Disposition", "attachment; filename=" + fileName)
      .contentLength(resource.contentLength())
      .contentType(MediaType.APPLICATION_OCTET_STREAM)
      .body(resource);
  }
}
