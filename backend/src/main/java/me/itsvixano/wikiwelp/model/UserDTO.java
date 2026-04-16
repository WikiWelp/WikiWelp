package me.itsvixano.wikiwelp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    public Long id;
    public String email;
    public String password;
}