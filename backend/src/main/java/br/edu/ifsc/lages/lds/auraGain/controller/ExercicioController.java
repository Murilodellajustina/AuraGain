package br.edu.ifsc.lages.lds.auraGain.controller;

import br.edu.ifsc.lages.lds.auraGain.dto.PesoDTO;
import br.edu.ifsc.lages.lds.auraGain.model.Exercicio;
import br.edu.ifsc.lages.lds.auraGain.model.TreinoExercicio;
import br.edu.ifsc.lages.lds.auraGain.repository.ExercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/exercicios")
@CrossOrigin(origins = "*")
@Tag(name = "Exercise Catalog", description = "Endpoints for retrieving the catalog of available exercises.")
public class ExercicioController {

    @Autowired
    private ExercicioRepository exercicioRepository;

    @GetMapping
    @Operation(summary = "List all exercises", description = "Retrieves the full list of standardized exercises stored in the database.")
    public ResponseEntity<List<Exercicio>> listarTodos() {
        List<Exercicio> lista = exercicioRepository.findAll();
        return ResponseEntity.ok(lista);
    }

}

