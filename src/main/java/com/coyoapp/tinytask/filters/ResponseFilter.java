package com.coyoapp.tinytask.filters;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import java.io.IOException;

@Component
@CommonsLog
public class ResponseFilter implements Filter {

    @Override
    public void init(FilterConfig fc) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        FilterInvocation fi = new FilterInvocation(request, response, chain);
        log.info("Found filter: url " + fi.getRequestUrl().contains("/oauth/token") + " and method " + fi.getHttpRequest().getMethod());
        fi.getHttpResponse().setHeader("Access-Control-Allow-Origin", "*");
        fi.getHttpResponse().setHeader("Access-Control-Allow-Credentials", "true");
        fi.getHttpResponse().setHeader("cache-control", "public");
        fi.getHttpResponse().setHeader("origin", "*");
        fi.getHttpResponse().setHeader("Vary", "origin");
        fi.getHttpResponse().setHeader("Access-Control-Allow-Headers", "Authorization, cache-control, Accept, Accept-Language, Content-Language, Content-Type");
        if (fi.getRequestUrl().contains("/oauth/token") && fi.getHttpRequest().getMethod().equalsIgnoreCase("OPTIONS")) {
            fi.getHttpResponse().setStatus(200);
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {
    }

}
