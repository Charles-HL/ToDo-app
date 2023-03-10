package com.charleshl.server.mainframe.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class LoginDTO {

    @Getter
    @Setter
    String username;

    @Getter
    @Setter
    String password;
}
