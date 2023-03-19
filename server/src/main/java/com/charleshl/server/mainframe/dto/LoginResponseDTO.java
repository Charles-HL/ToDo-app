/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.dto;

import lombok.Data;

/**
 * Login response DTO
 *
 * @author Charles HL
 */
@Data
public class LoginResponseDTO {
    /**
     * The token
     */
    String token;

    /**
     * Whether the login is successful
     */
    boolean success;

    /**
     * The message
     */
    String message;

    /**
     * The username
     */
    String username;
}
