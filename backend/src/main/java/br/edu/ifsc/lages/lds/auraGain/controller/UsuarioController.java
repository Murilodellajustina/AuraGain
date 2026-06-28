package br.edu.ifsc.lages.lds.auraGain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.edu.ifsc.lages.lds.auraGain.dto.LoginRequestDTO;
import br.edu.ifsc.lages.lds.auraGain.dto.UsuarioRegistroDTO;
import br.edu.ifsc.lages.lds.auraGain.model.Usuario;
import br.edu.ifsc.lages.lds.auraGain.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
@Tag(name = "User Management", description = "Endpoints for registering and authenticating Students and Personal Trainers.")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Authenticates a user and returns their authorization token and basic profile data.")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            Usuario usuario = usuarioService.autenticar(loginRequest.getEmail(), loginRequest.getSenha());
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/cadastrar")
    @Operation(summary = "Register User", description = "Registers a new user in the system. The profile can be ALUNO (Student) or PERSONAL (Trainer).")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioRegistroDTO registroRequest) {
        try {
            Usuario novoUsuario = usuarioService.cadastrar(registroRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Get User Profile", description = "Retrieves a user's complete data.")
    @GetMapping("/{email}")
    public ResponseEntity<?> buscarPerfil(@PathVariable String email) {
        try {
            return ResponseEntity.ok(usuarioService.buscarPorEmail(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Operation(summary = "Update User", description = "Updates the user account data.")
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioRegistroDTO dto) {
        try {
            return ResponseEntity.ok(usuarioService.atualizarUsuario(id, dto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Delete User", description = "Permanently deletes the user account.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Long id) {
        try {
            usuarioService.deletarUsuario(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
