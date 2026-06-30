package br.edu.ifsc.lages.lds.auraGain.controller;

import br.edu.ifsc.lages.lds.auraGain.dto.MedidaFisicaDTO;
import br.edu.ifsc.lages.lds.auraGain.service.MedidaFisicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/medidas")
@CrossOrigin(origins = "*")
@Tag(name = "Measures Management", description = "Endpoints for creating and retrieving the user measures.")
public class MedidaFisicaController {

    @Autowired private MedidaFisicaService medidaService;

    @PostMapping
    @Operation(summary = "Register Measures", description = "Registers the measures for a specific user")
    public ResponseEntity<?> registrar(@RequestBody MedidaFisicaDTO dto) {
        try {
            return ResponseEntity.ok(medidaService.registrarMedidas(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{email}")
    @Operation(summary = "Get History", description = "Retrieves the history of measures for a specific user")
    public ResponseEntity<?> buscarHistorico(@PathVariable String email) {
        return ResponseEntity.ok(medidaService.buscarHistorico(email));
    }
}