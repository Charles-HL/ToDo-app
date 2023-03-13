package com.charleshl.server.mainframe.config;

import com.charleshl.server.mainframe.config.jwt.JwtTokenFilter;
import com.charleshl.server.mainframe.config.jwt.JwtTokenProvider;
import com.charleshl.server.mainframe.service.MyUserDetailsService;
import com.charleshl.server.mainframe.service.SessionService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


/**
 * Security configuration
 *
 * @author Charles HL
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    /**
     * User details service
     */
    private MyUserDetailsService userDetailsService;

    /**
     * Session service
     */
    private SessionService sessionService;

    /**
     * JWT token provider
     */
    private JwtTokenProvider jwtTokenProvider;

    /**
     * Constructor
     *
     * @param userDetailsService User details service
     * @param jwtTokenProvider JWT token provider
     * @param sessionService Session service
     */
    public SecurityConfig(MyUserDetailsService userDetailsService, JwtTokenProvider jwtTokenProvider,
                          SessionService sessionService) {
        this.userDetailsService = userDetailsService;
        this.sessionService = sessionService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(List.of("CSRF-Token", "X-Requested-By", "Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Security filter chain
     *
     * @param http HTTP security
     * @return Security filter chain
     * @throws Exception Exception
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors()
                .and()
                .addFilterBefore(new JwtTokenFilter(jwtTokenProvider, sessionService), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/login", "/signup").permitAll()
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }

    /**
     * Authentication manager
     *
     * @param configuration Authentication configuration
     * @return Authentication manager
     * @throws Exception Exception
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * Password encoder
     *
     * @return Password encoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
