/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.dto;

import lombok.Data;

/**
 * Login DTO
 */
@Data
public class LoginDTO {

    /**
     * The username
     */
    String username;

    /**
     * The password
     */
    String password;
}
