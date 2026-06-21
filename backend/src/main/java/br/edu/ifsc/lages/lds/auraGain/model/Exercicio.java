package br.edu.ifsc.lages.lds.auraGain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_exercicio")
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(length = 50)
    private String nivel; 

    @Column(length = 100)
    private String equipamento;

    @Column(name = "musculo_principal", length = 100)
    private String musculoPrincipal; 

    public Exercicio() {}

    public Exercicio(Long id, String nome, String descricao, String nivel, String equipamento, String musculoPrincipal) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.nivel = nivel;
        this.equipamento = equipamento;
        this.musculoPrincipal = musculoPrincipal;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }

    public String getEquipamento() { return equipamento; }
    public void setEquipamento(String equipamento) { this.equipamento = equipamento; }

    public String getMusculoPrincipal() { return musculoPrincipal; }
    public void setMusculoPrincipal(String musculoPrincipal) { this.musculoPrincipal = musculoPrincipal; }
}