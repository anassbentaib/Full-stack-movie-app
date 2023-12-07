package com.beanass.Film.users.roles;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepositry extends JpaRepository<Role , Integer> {
    Optional<Role> findByName(String name);
}
