package com.mintic.seguridad43.Controladores;

import com.mintic.seguridad43.Modelos.Permiso;
import com.mintic.seguridad43.Modelos.PermisosRoles;
import com.mintic.seguridad43.Modelos.Rol;
import com.mintic.seguridad43.Repositorios.RepositorioPermiso;
import com.mintic.seguridad43.Repositorios.RepositorioPermisosRoles;
import com.mintic.seguridad43.Repositorios.RepositorioRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/permisos-roles")
public class ControladorPermisosRoles {

    @Autowired
    private RepositorioPermisosRoles miRepositorioPermisosRoles;

    @Autowired
    private RepositorioPermiso miRepositorioPermiso;

    @Autowired
    private RepositorioRol miRepositorioRol;

    @GetMapping("")
    public List<PermisosRoles> index(){
        return this.miRepositorioPermisosRoles.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("rol/{id_rol}/permiso/{id_permiso}")
    public PermisosRoles create(@PathVariable String id_rol, @PathVariable String id_permiso){
        PermisosRoles permisosRoles = new PermisosRoles();
        Rol rol = this.miRepositorioRol.findById(id_rol).orElse(null);
        Permiso permiso = this.miRepositorioPermiso.findById(id_permiso).orElse(null);

        if(rol != null && permiso != null){
            permisosRoles.setRol(rol);
            permisosRoles.setPermiso(permiso);
            return this.miRepositorioPermisosRoles.save(permisosRoles);
        }else {
            return null;
        }
    }

    @PutMapping("{id_permiso_rol}/rol/{id_rol}/permiso/{id_permiso}")
    public PermisosRoles update(@PathVariable String id_permiso_rol,@PathVariable String id_rol, @PathVariable String id_permiso){
        PermisosRoles permisosRoles = this.miRepositorioPermisosRoles.findById(id_permiso_rol).orElse(null);
        Rol rol = this.miRepositorioRol.findById(id_rol).orElse(null);
        Permiso permiso = this.miRepositorioPermiso.findById(id_permiso).orElse(null);
        if(permisosRoles != null && rol != null && permiso != null){
            permisosRoles.setRol(rol);
            permisosRoles.setPermiso(permiso);
            return this.miRepositorioPermisosRoles.save(permisosRoles);
        }else {
            return null;
        }

    }

    @DeleteMapping("{id}")
    public PermisosRoles  delete(@PathVariable String id){
        PermisosRoles permisosRoles = this.miRepositorioPermisosRoles.findById(id).orElse(null);
        if(permisosRoles != null){
            this.miRepositorioPermisosRoles.delete(permisosRoles);
            return permisosRoles;
        } else {
            return null;
        }
    }

    @GetMapping("{id}")
    public  PermisosRoles show(@PathVariable String id){
        PermisosRoles permisosRoles = this.miRepositorioPermisosRoles.findById(id).orElse(null);
        return permisosRoles;
    }

    @GetMapping("validar-permiso/rol/{id_rol}")
    public PermisosRoles validarPermiso(@PathVariable String id_rol, @RequestBody Permiso infoPermiso) {
        Permiso permiso = this.miRepositorioPermiso.getPermiso(infoPermiso.getUrl(), infoPermiso.getMetodo());
        Rol rol=this.miRepositorioRol.findById(id_rol).orElse(null);
        if (permiso != null && rol != null){
            return this.miRepositorioPermisosRoles.getPermisoRol(permiso.get_id(), rol.get_id());
        }else {
            return null;
        }
    }

}
