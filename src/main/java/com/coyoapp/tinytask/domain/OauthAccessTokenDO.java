package com.coyoapp.tinytask.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "oauth_access_token")
@Data
public class OauthAccessTokenDO {
  private String token_id;
  private byte[] token;
  @Id
  private String authentication_id;
  private String user_name;
  private String client_id;
  private byte[] authentication;
  private String refresh_token;

  public OauthAccessTokenDO() {
  }

  public OauthAccessTokenDO(String token_id, byte[] token, String authentication_id, String user_name, String client_id, byte[] authentication, String refresh_token) {
    this.token_id = token_id;
    this.token = token;
    this.authentication_id = authentication_id;
    this.user_name = user_name;
    this.client_id = client_id;
    this.authentication = authentication;
    this.refresh_token = refresh_token;
  }
}
