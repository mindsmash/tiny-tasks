package com.coyoapp.tinytask.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Component
public class DefaultFileRepository implements FileRepository {

  @Value("${file.base.dir}")
  private String filesBaseDir;

  public Optional<Path> initFilesDir() {
    Path path = Paths.get(filesBaseDir);
    if (!Files.exists(path)) {
      try {
        path = Files.createDirectories(path);
      } catch (IOException e) {
        return Optional.empty();
      }
    }
    return Optional.ofNullable(path);
  }

  public Optional<Path> saveFile(String name, byte[] content) {
    try {
      Path destination = Files.createFile(Paths.get(filesBaseDir, name));
      try (FileOutputStream fos = new FileOutputStream(destination.toFile())) {
        fos.write(content);
      }
      return Optional.ofNullable(destination);
    } catch (Exception e) {
      return Optional.empty();
    }
  }

  public Optional<byte[]> getImageByName(String name) {
    try {
      return Optional.of(Files.readAllBytes(Paths.get(filesBaseDir, name)));
    } catch (Exception e) {
      return Optional.empty();
    }
  }
}
