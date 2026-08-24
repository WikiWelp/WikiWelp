package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.PageDTO;

public interface IPageService {
    PageDTO savePage(PageDTO page);

    PageDTO findByTitle(String title);
}
