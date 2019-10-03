package com.coyoapp.tinytask.dto;

import lombok.Data;

@Data
public class AttachResponse {

	private String id;

	private String type;

	private String fileName;

	private byte[] binAttach;
}
