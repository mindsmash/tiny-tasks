package com.coyoapp.tinytask.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface FileService {
  String saveFile(Optional<MultipartFile> file);

  byte[] getFile(String fileName);
}
