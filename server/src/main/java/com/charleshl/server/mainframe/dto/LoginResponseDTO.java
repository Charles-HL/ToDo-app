package com.charleshl.server.mainframe.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    String token;
    boolean success;
    String message;
    String username;
}
