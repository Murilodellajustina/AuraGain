package br.edu.ifsc.lages.lds.auraGain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_treino_exercicio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TreinoExercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treino_id", nullable = false)
    @JsonIgnore
    private Treino treino;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "exercicio_id", nullable = false)
    private Exercicio exercicio;

    @Column(nullable = false)
    private Integer series;

    @Column(name = "repeticoes_alvo", nullable = false)
    private Integer repeticoesAlvo;

    @Column(name = "peso_kg")
    private Integer peso = 0;

    @PrePersist
    @PreUpdate
    public void definirPesoPadrao() {
        if (peso == null) {
            peso = 0;
        }
    }
}
