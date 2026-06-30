package br.edu.ifsc.lages.lds.auraGain.repository;

import br.edu.ifsc.lages.lds.auraGain.model.MedidaFisica;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedidaFisicaRepository extends JpaRepository<MedidaFisica, Long> {
    List<MedidaFisica> findByUsuarioEmailOrderByDataAvaliacaoAsc(String email);
}