package br.edu.ifsc.lages.lds.auraGain.service;

import br.edu.ifsc.lages.lds.auraGain.dto.ItemTreinoDTO;
import br.edu.ifsc.lages.lds.auraGain.dto.PesoDTO;
import br.edu.ifsc.lages.lds.auraGain.dto.TreinoRequestDTO;
import br.edu.ifsc.lages.lds.auraGain.model.Exercicio;
import br.edu.ifsc.lages.lds.auraGain.model.Treino;
import br.edu.ifsc.lages.lds.auraGain.model.Usuario;
import br.edu.ifsc.lages.lds.auraGain.repository.ExercicioRepository;
import br.edu.ifsc.lages.lds.auraGain.repository.TreinoExercicioRepository;
import br.edu.ifsc.lages.lds.auraGain.model.TreinoExercicio;
import br.edu.ifsc.lages.lds.auraGain.repository.TreinoRepository;
import br.edu.ifsc.lages.lds.auraGain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TreinoService {
    @Autowired
    private TreinoRepository treinoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ExercicioRepository exercicioRepository;

    @Autowired
    private TreinoExercicioRepository treinoExercicioRepository;

    @Transactional
    public Treino salvarTreinoCompleto(TreinoRequestDTO dados) throws Exception {
        Usuario usuario = usuarioRepository.findByEmail(dados.getEmailUsuario())
                .orElseThrow(() -> new Exception("Usuário não encontrado."));

        Treino treino = new Treino();
        treino.setTitulo("Ficha " + dados.getDiaFicha());
        treino.setUsuario(usuario);

        for (ItemTreinoDTO item : dados.getExercicios()) {
            Exercicio exercicio = exercicioRepository.findById(item.getExercicioId())
                    .orElseThrow(() -> new Exception("Exercício ID " + item.getExercicioId() + " não existe."));

            TreinoExercicio treinoExercicio = new TreinoExercicio();
            treinoExercicio.setTreino(treino);
            treinoExercicio.setExercicio(exercicio);
            treinoExercicio.setSeries(item.getSeries());
            treinoExercicio.setRepeticoesAlvo(item.getRepeticoes());

            treino.getExercicios().add(treinoExercicio);
        }

        return treinoRepository.save(treino);
    }

    public List<Treino> buscarTreinosDoUsuario(String email) throws Exception {
        usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("Usuário não encontrado."));

        return treinoRepository.findByUsuarioEmail(email);
    }

    @Transactional
    public void atualizarPesos(List<PesoDTO> pesos) {
        for (PesoDTO dto : pesos) {
            TreinoExercicio te = treinoExercicioRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Registro não encontrado"));

            te.setPeso(dto.getPeso());
        }
    }

    @Transactional
    public Treino atualizarTreino(Long idTreino, TreinoRequestDTO dados) throws Exception {
        Treino treino = treinoRepository.findById(idTreino)
                .orElseThrow(() -> new Exception("Treino não encontrado."));

        treino.setTitulo("Ficha " + dados.getDiaFicha());

        treino.getExercicios().clear();

        for (ItemTreinoDTO item : dados.getExercicios()) {
            Exercicio exercicio = exercicioRepository.findById(item.getExercicioId())
                    .orElseThrow(() -> new Exception("Exercício ID " + item.getExercicioId() + " não existe."));

            TreinoExercicio treinoExercicio = new TreinoExercicio();
            treinoExercicio.setTreino(treino);
            treinoExercicio.setExercicio(exercicio);
            treinoExercicio.setSeries(item.getSeries());
            treinoExercicio.setRepeticoesAlvo(item.getRepeticoes());
            
            treino.getExercicios().add(treinoExercicio);
        }

        return treinoRepository.save(treino);
    }

    public void deletarTreino(Long idTreino) {
        treinoRepository.deleteById(idTreino);
    }
}