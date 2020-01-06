package com.coyoapp.tinytask.configuration;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.provider.token.TokenStore;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

@CommonsLog
public class OauthClientFilter extends OAuth2ClientAuthenticationProcessingFilter {
    private final TokenStore tokenStore;

    public OauthClientFilter(TokenStore tokenStore) {
        super("/");
        this.tokenStore = tokenStore;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }

}
