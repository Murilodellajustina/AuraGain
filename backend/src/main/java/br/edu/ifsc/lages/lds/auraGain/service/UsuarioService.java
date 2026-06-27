package br.edu.ifsc.lages.lds.auraGain.service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ifsc.lages.lds.auraGain.model.Usuario;
import br.edu.ifsc.lages.lds.auraGain.repository.UsuarioRepository;
import br.edu.ifsc.lages.lds.auraGain.dto.UsuarioRegistroDTO;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    private UsuarioRegistroDTO dados;

    public Usuario autenticar(String email, String senha) throws Exception {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            throw new Exception("Usuário não encontrado");
        }
        Usuario usuario = usuarioOpt.get();
        if (!usuario.getSenha().equals(senha)) {
            throw new Exception("Senha incorreta");
        }
        return usuario;
        
    }

    public Usuario cadastrar(UsuarioRegistroDTO dados) throws Exception {
        if (usuarioRepository.findByEmail(dados.getEmail()).isPresent()) {
            throw new Exception("Email já registrado");
        }
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dados.getNome());
        novoUsuario.setEmail(dados.getEmail());
        novoUsuario.setSenha(dados.getSenha());
        novoUsuario.setPerfil(dados.getPerfil() != null ? dados.getPerfil() : Usuario.TipoPerfil.ALUNO);

        if (novoUsuario.getPerfil() == Usuario.TipoPerfil.PERSONAL) {
            novoUsuario.setCref(dados.getCref());
            novoUsuario.setBiografia(dados.getBiografia());
            novoUsuario.setFotoPerfil(dados.getFotoPerfil());
        }
        return usuarioRepository.save(novoUsuario);
    }
}
