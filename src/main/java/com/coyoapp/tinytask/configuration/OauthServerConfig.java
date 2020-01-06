package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.filters.ResponseFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.WebResponseExceptionTranslator;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.sql.DataSource;

@Configuration
@EnableAuthorizationServer
public class OauthServerConfig extends AuthorizationServerConfigurerAdapter {

    private final DataSource dataSource;
    private final AuthenticationManager authenticationManager;
    private final WebResponseExceptionTranslator exceptionTranslator;
    private final UserDetailsService userDetailsService;
    private final TokenStore tokenStore;
    private final ResponseFilter responseFilter;
    private final AccessDeniedHandler accessDeniedHandler;
    @Value("${app.params.security.ui-client}")
    private String uiClient;
    @Value("${app.params.security.ui-secret}")
    private String uiSecret;

    public OauthServerConfig(DataSource dataSource, AuthenticationManager authenticationManager,
                             WebResponseExceptionTranslator exceptionTranslator, @Qualifier("userServiceImpl") UserDetailsService userDetailsService,
                             TokenStore tokenStore, ResponseFilter responseFilter, AccessDeniedHandler accessDeniedHandler) {
        this.dataSource = dataSource;
        this.exceptionTranslator = exceptionTranslator;
        this.userDetailsService = userDetailsService;
        this.tokenStore = tokenStore;
        this.authenticationManager = authenticationManager;
        this.responseFilter = responseFilter;
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
                .authenticationManager(authenticationManager)
                .tokenStore(tokenStore)
                .exceptionTranslator(exceptionTranslator)
                .userDetailsService(userDetailsService)
                .tokenEnhancer(tokenEnhancer())
                .tokenServices(getTokenServices())
        ;

    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
                .withClient(uiClient).secret(uiSecret)
                .authorizedGrantTypes("password", "refresh_token", "client_credentials")
                .scopes("read", "create", "updated", "delete", "openid");
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        security.addTokenEndpointAuthenticationFilter(responseFilter);
    }

    @Bean
    @Primary
    public AuthorizationServerTokenServices getTokenServices() {
        DefaultTokenServices tokenServices = new DefaultTokenServices();
        tokenServices.setTokenEnhancer(tokenEnhancer());
        tokenServices.setTokenStore(tokenStore);
        return tokenServices;
    }
    //
    @Bean
    public TokenEnhancer tokenEnhancer(){
        return new CustomTokenEnhancer();
    }

}

