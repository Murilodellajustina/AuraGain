package br.edu.ifsc.lages.lds.auraGain.controller;

import br.edu.ifsc.lages.lds.auraGain.dto.MedidaFisicaDTO;
import br.edu.ifsc.lages.lds.auraGain.service.MedidaFisicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medidas")
@CrossOrigin(origins = "*")
public class MedidaFisicaController {

    @Autowired private MedidaFisicaService medidaService;

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody MedidaFisicaDTO dto) {
        try {
            return ResponseEntity.ok(medidaService.registrarMedidas(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> buscarHistorico(@PathVariable String email) {
        return ResponseEntity.ok(medidaService.buscarHistorico(email));
    }
}