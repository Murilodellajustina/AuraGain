package br.edu.ifsc.lages.lds.auraGain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_vinculo_personal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VinculoPersonal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "personal_id", nullable = false)
    private Usuario personal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Usuario aluno;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusVinculo status;

    public enum StatusVinculo {
        PENDENTE,
        ACEITO,
        RECUSADO
    }
}
