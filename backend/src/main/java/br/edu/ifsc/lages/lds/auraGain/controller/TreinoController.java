package br.edu.ifsc.lages.lds.auraGain.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import br.edu.ifsc.lages.lds.auraGain.dto.PesoDTO;
import br.edu.ifsc.lages.lds.auraGain.dto.TreinoRequestDTO;
import br.edu.ifsc.lages.lds.auraGain.model.Treino;
import br.edu.ifsc.lages.lds.auraGain.model.TreinoExercicio;
import br.edu.ifsc.lages.lds.auraGain.repository.TreinoExercicioRepository;
import br.edu.ifsc.lages.lds.auraGain.repository.TreinoRepository;
import br.edu.ifsc.lages.lds.auraGain.service.TreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@RestController
@RequestMapping("/api/treinos")
@CrossOrigin(origins = "*")
public class TreinoController {

    @PutMapping("/pesos")
    public ResponseEntity<?> atualizarPesos(@RequestBody List<PesoDTO> pesos) {
        treinoService.atualizarPesos(pesos);
        return ResponseEntity.ok().build();
    }

    @Autowired
    private TreinoService treinoService;

    @PostMapping
    public ResponseEntity<?> cadastrarTreino(@RequestBody TreinoRequestDTO treinoRequest) {
        try {
            Treino treinoSalvo = treinoService.salvarTreinoCompleto(treinoRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(treinoSalvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{email}")
    public ResponseEntity<?> buscarTreinosPorUsuario(@PathVariable String email) {
        try {
            List<Treino> treinos = treinoService.buscarTreinosDoUsuario(email);
            return ResponseEntity.ok(treinos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
