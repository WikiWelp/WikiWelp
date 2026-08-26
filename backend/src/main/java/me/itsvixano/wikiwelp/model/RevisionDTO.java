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
    public Long id;
    public Long pageId;
    public String content;
    public Timestamp createdAt;
}
