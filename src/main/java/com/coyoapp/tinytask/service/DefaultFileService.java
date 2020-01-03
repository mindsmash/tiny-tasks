package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.exception.FileException;
import com.coyoapp.tinytask.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Path;
import java.time.Instant;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultFileService implements FileService {

  @Autowired
  private FileRepository fileRepository;

  @PostConstruct
  private void initImageRootFolder() {
    Path path = fileRepository.initFilesDir()
      .orElseThrow(() -> new RuntimeException("File base directory not accesssible."));
    log.debug("initImageRootFolder(imageBaseDir={})", path.toAbsolutePath());
  }

  public String saveFile(Optional<MultipartFile> file) {
    String fileName = null;
    if (file.isPresent() && !file.get().isEmpty()) {
      try {
        MultipartFile multipartFile = file.get();
        fileName = wrapFileName(multipartFile);
        fileRepository.saveFile(fileName, multipartFile.getBytes()).orElseThrow(() -> new FileException("File saving failed."));
      } catch (IOException e) {
        throw new FileException("File reading failed.");
      }
    }
    return fileName;
  }

  public byte[] getFile(String fileName) {
    return fileRepository.getImageByName(fileName).orElseThrow(() -> new FileException("File reading error."));
  }

  private String wrapFileName(MultipartFile multipartFile) {
    String origName = multipartFile.getOriginalFilename();
    return new StringBuilder()
      .append(FilenameUtils.getBaseName(origName).replaceAll("\\W", "-")) // replace all non word chars with -
      .append(Instant.now().getNano())
      .append('.')
      .append(FilenameUtils.getExtension(origName))
      .toString();
  }
}
