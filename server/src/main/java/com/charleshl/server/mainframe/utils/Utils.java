package com.charleshl.server.mainframe.utils;

import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;

public final class Utils {

    /**
     * Initialize and unproxy an entity.
     * @param entity the entity to initialize and unproxy
     * @return the initialized entity
     */
    public static <T> T initializeAndUnproxy(T entity) {
        if (entity == null) {
            throw new NullPointerException("Entity passed for initialization is null");
        }

        Hibernate.initialize(entity);
        if (entity instanceof HibernateProxy) {
            entity = (T) ((HibernateProxy) entity).getHibernateLazyInitializer().getImplementation();
        }
        return entity;
    }
}
