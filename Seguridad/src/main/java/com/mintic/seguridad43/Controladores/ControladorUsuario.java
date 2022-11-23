package com.mintic.seguridad43.Controladores;

import com.mintic.seguridad43.Modelos.Rol;
import com.mintic.seguridad43.Modelos.Usuarios;
import com.mintic.seguridad43.Repositorios.RepositorioRol;
import com.mintic.seguridad43.Repositorios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/usuarios")
public class ControladorUsuario {

    @Autowired
    private RepositorioUsuario miRepositorioUsuario;

    @Autowired
    private RepositorioRol miRepositorioRol;

    @GetMapping("")
    public List<Usuarios> index() {
        return this.miRepositorioUsuario.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Usuarios create(@RequestBody Usuarios infoUsuario) {
        infoUsuario.setContrasena(convertirSHA256(infoUsuario.getContrasena()));
        return this.miRepositorioUsuario.save(infoUsuario);
    }

    @PutMapping("{id}")
    public Usuarios update(@PathVariable String id, @RequestBody Usuarios infoUsuario) {
        Usuarios usuario = this.miRepositorioUsuario.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setSeudonimo(infoUsuario.getSeudonimo());
            usuario.setCorreo(infoUsuario.getCorreo());
            usuario.setContrasena(convertirSHA256(infoUsuario.getContrasena()));
            return this.miRepositorioUsuario.save(usuario);
        } else {
            return null;
        }
    }

    @PostMapping("/validate")
    public Usuarios validate(@RequestBody Usuarios infoUsuario, final HttpServletResponse response) throws IOException {
        Usuarios usuario = this.miRepositorioUsuario.getUserByEmail(infoUsuario.getCorreo());
        if (usuario != null){
            if(usuario.getContrasena().equals(convertirSHA256(infoUsuario.getContrasena()))){
                usuario.setContrasena("");
                return usuario;
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                return null;
            }
        }else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }
    }


    @DeleteMapping("{id}")
    public Usuarios delete(@PathVariable String id){
        Usuarios usuario = this.miRepositorioUsuario.findById(id).orElse(null);
        if (usuario != null){
            this.miRepositorioUsuario.delete(usuario);
            return usuario;
        } else {
            return null;
        }
    }

    @GetMapping("{id}")
    public Usuarios show(@PathVariable String id){
        Usuarios usuario = this.miRepositorioUsuario.findById(id).orElse(null);
        return usuario;
    }

    @PutMapping("{id_usuario}/rol/{id_rol}")
    public Usuarios setRol(@PathVariable String id_usuario,@PathVariable String id_rol) {
        Usuarios usuario = this.miRepositorioUsuario.findById(id_usuario).orElse(null);
        Rol rol = this.miRepositorioRol.findById(id_rol).orElse(null);
        if (usuario != null && rol != null) {
            usuario.setRol(rol);
            return this.miRepositorioUsuario.save(usuario);
        } else {
            return null;
        }
    }

    public String convertirSHA256(String password) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        }
        catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
        byte[] hash = md.digest(password.getBytes());
        StringBuffer sb = new StringBuffer();
        for(byte b : hash) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    public static String getMD5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger number = new BigInteger(1, messageDigest);
            String hashtext = number.toString(16);

            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
