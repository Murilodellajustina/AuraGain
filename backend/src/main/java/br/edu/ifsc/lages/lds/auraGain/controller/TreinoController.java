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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/treinos")
@CrossOrigin(origins = "*")
@Tag(name = "Workout Management", description = "Endpoints for creating and retrieving personalized workout routines.")
public class TreinoController {

    @PutMapping("/pesos")
    @Operation(summary = "Update Weights", description = "Updates the weight for the workout exercises")
    public ResponseEntity<?> atualizarPesos(@RequestBody List<PesoDTO> pesos) {
        treinoService.atualizarPesos(pesos);
        return ResponseEntity.ok().build();
    }

    @Autowired
    private TreinoService treinoService;

    @PostMapping
    @Operation(summary = "Create Workout Routine", description = "Registers a new workout routine with its associated exercises, sets, and reps for a specific user.")
    public ResponseEntity<?> cadastrarTreino(@RequestBody TreinoRequestDTO treinoRequest) {
        try {
            Treino treinoSalvo = treinoService.salvarTreinoCompleto(treinoRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(treinoSalvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{email}")
    @Operation(summary = "Get Workouts by User", description = "Retrieves a list of all workout routines belonging to a specific user via their email.")
    public ResponseEntity<?> buscarTreinosPorUsuario(@PathVariable String email) {
        try {
            List<Treino> treinos = treinoService.buscarTreinosDoUsuario(email);
            return ResponseEntity.ok(treinos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Operation(summary = "Update Workout", description = "Updates an existing workout plan.")
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarTreino(@PathVariable Long id, @RequestBody TreinoRequestDTO dto) {
        try {
            return ResponseEntity.ok(treinoService.atualizarTreino(id, dto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Delete Workout", description = "Deletes a workout routine.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarTreino(@PathVariable Long id) {
        try {
            treinoService.deletarTreino(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
