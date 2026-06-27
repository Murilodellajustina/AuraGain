package br.edu.ifsc.lages.lds.auraGain.controller;

import br.edu.ifsc.lages.lds.auraGain.dto.PersonalResponseDTO;
import br.edu.ifsc.lages.lds.auraGain.dto.SolicitacaoVinculoDTO;
import br.edu.ifsc.lages.lds.auraGain.service.VinculoPersonalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/vinculos")
@CrossOrigin(origins = "*")
public class VinculoPersonalController {
    @Autowired
    private VinculoPersonalService vinculoService;

    @GetMapping("/personais")
    public ResponseEntity<List<PersonalResponseDTO>> listarPersonais() {
        return ResponseEntity.ok(vinculoService.listarPersonaisDisponiveis());
    }

    @PostMapping("/solicitar/{personalId}")
    public ResponseEntity<?> solicitarVinculo(@PathVariable Long personalId, @RequestParam String emailAluno) {
        try {
            vinculoService.enviarSolicitacao(emailAluno, personalId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Solicitação enviada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/pendentes")
    public ResponseEntity<?> listarPendentes(@RequestParam String emailPersonal) {
        try {
            return ResponseEntity.ok(vinculoService.listarSolicitacoesPendentes(emailPersonal));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/meus-alunos")
    public ResponseEntity<?> listarMeusAlunos(@RequestParam String emailPersonal) {
        try {
            return ResponseEntity.ok(vinculoService.listarMeusAlunos(emailPersonal));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/responder/{vinculoId}")
    public ResponseEntity<?> responderSolicitacao(@PathVariable Long vinculoId, @RequestParam boolean aceitar) {
        try {
            vinculoService.responderSolicitacao(vinculoId, aceitar);
            return ResponseEntity.ok(aceitar ? "Aluno aceito com sucesso!" : "Solicitação recusada.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
