package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.PageDTO;

import java.util.List;

public interface IPageService {
    PageDTO savePage(PageDTO page);

    PageDTO findByTitle(String title);

    List<PageDTO> findByTag(String tagName);

    List<PageDTO> findAll();

    boolean deleteById(Long id);
}
