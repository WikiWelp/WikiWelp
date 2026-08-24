package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.PageDTO;

public interface IPageDao {
    PageDTO savePage(PageDTO page);

    PageDTO findByTitle(String title);
}
