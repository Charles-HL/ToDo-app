/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.controller;

import org.apache.catalina.connector.ClientAbortException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * API exception handler
 *
 * @author Charles HL
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler
{
    /**
     * Handle exception
     *
     * @param e exception
     * @param request request
     * @return response entity
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherException(Exception e, WebRequest request)
    {
        if (e instanceof ClientAbortException)
        {
            // if client abort, do nothing as it is normal for the client to unsubscribe of a request
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        if (e instanceof SecurityException)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}