package com.mintic.seguridad43.Repositorios;

import com.mintic.seguridad43.Modelos.Usuarios;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface RepositorioUsuario extends MongoRepository<Usuarios, String> {
    @Query("{'correo': ?0}")
    public Usuarios getUserByEmail(String correo);
}
