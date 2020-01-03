package com.coyoapp.tinytask.repository;

import java.nio.file.Path;
import java.util.Optional;

public interface FileRepository {
  Optional<Path> initFilesDir();

  Optional<Path> saveFile(String name, byte[] content);

  Optional<byte[]> getImageByName(String name);
}
