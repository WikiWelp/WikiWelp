package me.itsvixano.wikiwelp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PageDTO {
    public Long id;
    public String title;
    public String content;
}

