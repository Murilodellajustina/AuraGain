package br.edu.ifsc.lages.lds.auraGain.repository;

import br.edu.ifsc.lages.lds.auraGain.model.Treino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreinoRepository extends JpaRepository<Treino, Long> {
    List<Treino> findByUsuarioEmail(String email);
}