package br.edu.ifsc.lages.lds.auraGain.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import java.util.stream.Collectors;
import br.edu.ifsc.lages.lds.auraGain.dto.PersonalResponseDTO;
import br.edu.ifsc.lages.lds.auraGain.dto.SolicitacaoVinculoDTO;
import br.edu.ifsc.lages.lds.auraGain.model.Usuario;
import br.edu.ifsc.lages.lds.auraGain.model.VinculoPersonal;
import br.edu.ifsc.lages.lds.auraGain.repository.UsuarioRepository;
import br.edu.ifsc.lages.lds.auraGain.repository.VinculoPersonalRepository;
import java.util.List;

@Service
public class VinculoPersonalService {
    @Autowired
    private VinculoPersonalRepository vinculoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<PersonalResponseDTO> listarPersonaisDisponiveis() {
        List<Usuario> personais = usuarioRepository.findByPerfil(Usuario.TipoPerfil.PERSONAL);
        
        return personais.stream().map(p -> new PersonalResponseDTO(
                p.getId(), p.getNome(), p.getFotoPerfil(), p.getCref(), p.getBiografia()
        )).collect(Collectors.toList());
    }

    @Transactional
    public VinculoPersonal enviarSolicitacao(String emailAluno, Long personalId) throws Exception {
        Usuario aluno = usuarioRepository.findByEmail(emailAluno)
                .orElseThrow(() -> new Exception("Aluno não encontrado."));

        Usuario personal = usuarioRepository.findById(personalId)
                .orElseThrow(() -> new Exception("Personal não encontrado."));

        if (!personal.getPerfil().equals(Usuario.TipoPerfil.PERSONAL)) {
            throw new Exception("O usuário selecionado não é um Personal.");
        }

        Optional<VinculoPersonal> vinculoExistente = vinculoRepository.findByAlunoIdAndPersonalId(aluno.getId(), personal.getId());
        if (vinculoExistente.isPresent()) {
            throw new Exception("Já existe uma solicitação ou vínculo com este personal.");
        }

        VinculoPersonal novoVinculo = new VinculoPersonal();
        novoVinculo.setAluno(aluno);
        novoVinculo.setPersonal(personal);
        novoVinculo.setStatus(VinculoPersonal.StatusVinculo.PENDENTE);

        return vinculoRepository.save(novoVinculo);
    }

    public List<SolicitacaoVinculoDTO> listarSolicitacoesPendentes(String emailPersonal) throws Exception {
        Usuario personal = usuarioRepository.findByEmail(emailPersonal)
                .orElseThrow(() -> new Exception("Personal não encontrado."));

        List<VinculoPersonal> pendentes = vinculoRepository.findByPersonalIdAndStatus(personal.getId(), VinculoPersonal.StatusVinculo.PENDENTE);

        return pendentes.stream().map(v -> new SolicitacaoVinculoDTO(
                v.getId(), v.getAluno().getNome(), v.getAluno().getEmail(), v.getStatus().name()
        )).collect(Collectors.toList());
    }

    public List<SolicitacaoVinculoDTO> listarMeusAlunos(String emailPersonal) throws Exception {
        Usuario personal = usuarioRepository.findByEmail(emailPersonal)
                .orElseThrow(() -> new Exception("Personal não encontrado."));

        List<VinculoPersonal> aceitos = vinculoRepository.findByPersonalIdAndStatus(personal.getId(), VinculoPersonal.StatusVinculo.ACEITO);

        return aceitos.stream().map(v -> new SolicitacaoVinculoDTO(
                v.getId(), v.getAluno().getNome(), v.getAluno().getEmail(), v.getStatus().name()
        )).collect(Collectors.toList());
    }

    @Transactional
    public void responderSolicitacao(Long idVinculo, boolean aceitar) throws Exception {
        VinculoPersonal vinculo = vinculoRepository.findById(idVinculo)
                .orElseThrow(() -> new Exception("Solicitação não encontrada."));

        if (aceitar) {
            vinculo.setStatus(VinculoPersonal.StatusVinculo.ACEITO);
        } else {
            vinculo.setStatus(VinculoPersonal.StatusVinculo.RECUSADO);
        }

        vinculoRepository.save(vinculo);
    }
}
