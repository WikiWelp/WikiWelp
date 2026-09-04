package me.itsvixano.wikiwelp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private Boolean admin = false;
}