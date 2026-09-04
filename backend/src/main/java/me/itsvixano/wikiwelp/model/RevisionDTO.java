package me.itsvixano.wikiwelp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RevisionDTO {
    private Long id;
    private Long pageId;
    private String content;
    private Timestamp createdAt;
}
