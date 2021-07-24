package com.coyoapp.tinytask.batch.base;

import java.util.LinkedList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class TinyTaskBatchJob<S, T> {

  protected final Integer chunkSize;

  protected List<T> chunk;

  public TinyTaskBatchJob(Integer chunkSize) {
    this.chunkSize = chunkSize;
    this.chunk = new LinkedList<>();
  }

  protected abstract S read();

  protected abstract T process(S s);

  protected abstract void write(List<T> tList);

  protected abstract void init();

  public final void run() {
    this.init();
    log.debug("Batch execute");
    S next = read();
    while (next != null) {
      chunk.add(this.process(next));
      if (chunk.size() >= chunkSize) {
        this.write(this.chunk);
        this.chunk.clear();
      }
      next = read();
    }
    if(chunk.size() > 0) {
      this.write(this.chunk);
      this.chunk.clear();
    }
  }
}
