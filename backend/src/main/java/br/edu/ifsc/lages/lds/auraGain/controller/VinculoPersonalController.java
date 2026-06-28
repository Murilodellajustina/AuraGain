package br.edu.ifsc.lages.lds.auraGain.controller;

import br.edu.ifsc.lages.lds.auraGain.dto.PersonalResponseDTO;
import br.edu.ifsc.lages.lds.auraGain.dto.SolicitacaoVinculoDTO;
import br.edu.ifsc.lages.lds.auraGain.service.VinculoPersonalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("api/vinculos")
@CrossOrigin(origins = "*")
@Tag(name = "Personal Trainer Connections", description = "Endpoints for managing requests and connections between Students and Trainers.")
public class VinculoPersonalController {
    @Autowired
    private VinculoPersonalService vinculoService;

    @GetMapping("/personais")
    @Operation(summary = "List available Trainers", description = "Retrieves a public list of all registered Personal Trainers in the platform.")
    public ResponseEntity<List<PersonalResponseDTO>> listarPersonais() {
        return ResponseEntity.ok(vinculoService.listarPersonaisDisponiveis());
    }

    @PostMapping("/solicitar/{personalId}")
    @Operation(summary = "Send Connection Request", description = "Allows a student to send a training request to a specific Personal Trainer.")
    public ResponseEntity<?> solicitarVinculo(@PathVariable Long personalId, @RequestParam String emailAluno) {
        try {
            vinculoService.enviarSolicitacao(emailAluno, personalId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Solicitação enviada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/pendentes")
    @Operation(summary = "List Pending Requests", description = "Retrieves all unanswered connection requests for a specific Personal Trainer.")
    public ResponseEntity<?> listarPendentes(@RequestParam String emailPersonal) {
        try {
            return ResponseEntity.ok(vinculoService.listarSolicitacoesPendentes(emailPersonal));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/meus-alunos")
    @Operation(summary = "List Managed Students", description = "Retrieves all active students currently managed by a specific Personal Trainer.")
    public ResponseEntity<?> listarMeusAlunos(@RequestParam String emailPersonal) {
        try {
            return ResponseEntity.ok(vinculoService.listarMeusAlunos(emailPersonal));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/responder/{vinculoId}")
    @Operation(summary = "Respond to Request", description = "Allows a Personal Trainer to accept or reject a student's connection request.")
    public ResponseEntity<?> responderSolicitacao(@PathVariable Long vinculoId, @RequestParam boolean aceitar) {
        try {
            vinculoService.responderSolicitacao(vinculoId, aceitar);
            return ResponseEntity.ok(aceitar ? "Aluno aceito com sucesso!" : "Solicitação recusada.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
