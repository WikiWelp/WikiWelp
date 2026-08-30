package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.PageDTO;

import java.util.List;

public interface IPageDao {
    PageDTO savePage(PageDTO page);

    PageDTO findByTitle(String title);

    List<PageDTO> findByTag(String tagName);

    List<PageDTO> findAll();

    boolean deleteByTitle(String title);
}
