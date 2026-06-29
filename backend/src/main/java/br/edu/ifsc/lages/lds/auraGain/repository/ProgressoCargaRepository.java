package br.edu.ifsc.lages.lds.auraGain.repository;

import br.edu.ifsc.lages.lds.auraGain.model.ProgressoCarga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProgressoCargaRepository extends JpaRepository<ProgressoCarga, Long> {
    List<ProgressoCarga> findByUsuarioEmailAndExercicioIdOrderByDataExecucaoAsc(String email, Long exercicioId);
}