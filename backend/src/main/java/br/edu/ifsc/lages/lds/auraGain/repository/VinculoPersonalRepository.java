package br.edu.ifsc.lages.lds.auraGain.repository;

import br.edu.ifsc.lages.lds.auraGain.model.VinculoPersonal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VinculoPersonalRepository extends JpaRepository<VinculoPersonal, Long> {

    List<VinculoPersonal> findByAlunoId(Long alunoId);
    List<VinculoPersonal> findByPersonalIdAndStatus(Long personalId, VinculoPersonal.StatusVinculo status);
    Optional<VinculoPersonal> findByAlunoIdAndPersonalId(Long alunoId, Long personalId);
}
