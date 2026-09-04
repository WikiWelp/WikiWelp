package me.itsvixano.wikiwelp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PageDTO {
    private Long id;
    private String title;
    private String content;
    private List<TagDTO> tags;
    private List<RevisionDTO> revisions;
}
