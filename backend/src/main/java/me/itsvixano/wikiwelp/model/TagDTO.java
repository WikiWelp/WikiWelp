package me.itsvixano.wikiwelp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagDTO {
    public Long id;
    public String name;

    public TagDTO(String name) {
        this.name = name;
    }
}
