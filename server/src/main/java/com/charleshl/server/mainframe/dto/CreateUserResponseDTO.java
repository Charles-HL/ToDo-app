/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.dto;

import lombok.Data;

/**
 * Create user response DTO
 */
@Data
public class CreateUserResponseDTO {
    /**
     * Whether the user is created successfully
     */
    boolean success;
    /**
     * The message
     */
    String message;

}
