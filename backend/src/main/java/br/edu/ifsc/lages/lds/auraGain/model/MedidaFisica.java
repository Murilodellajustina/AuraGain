package br.edu.ifsc.lages.lds.auraGain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_medida_fisica")
public class MedidaFisica {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDate dataAvaliacao;

    private Double peso;
    private Double altura;
    private Double imc;

    private Double torax;
    private Double cintura;
    private Double quadril;
    private Double bracoEsquerdo;
    private Double bracoDireito;
    private Double coxaEsquerda;
    private Double coxaDireita;
    private Double panturrilhaEsquerda;
    private Double panturrilhaDireita;

    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public Usuario getUsuario() { return usuario; } public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public LocalDate getDataAvaliacao() { return dataAvaliacao; } public void setDataAvaliacao(LocalDate dataAvaliacao) { this.dataAvaliacao = dataAvaliacao; }
    public Double getPeso() { return peso; } public void setPeso(Double peso) { this.peso = peso; }
    public Double getAltura() { return altura; } public void setAltura(Double altura) { this.altura = altura; }
    public Double getImc() { return imc; } public void setImc(Double imc) { this.imc = imc; }
    public Double getTorax() { return torax; } public void setTorax(Double torax) { this.torax = torax; }
    public Double getCintura() { return cintura; } public void setCintura(Double cintura) { this.cintura = cintura; }
    public Double getQuadril() { return quadril; } public void setQuadril(Double quadril) { this.quadril = quadril; }
    public Double getBracoEsquerdo() { return bracoEsquerdo; } public void setBracoEsquerdo(Double bracoEsquerdo) { this.bracoEsquerdo = bracoEsquerdo; }
    public Double getBracoDireito() { return bracoDireito; } public void setBracoDireito(Double bracoDireito) { this.bracoDireito = bracoDireito; }
    public Double getCoxaEsquerda() { return coxaEsquerda; } public void setCoxaEsquerda(Double coxaEsquerda) { this.coxaEsquerda = coxaEsquerda; }
    public Double getCoxaDireita() { return coxaDireita; } public void setCoxaDireita(Double coxaDireita) { this.coxaDireita = coxaDireita; }
    public Double getPanturrilhaEsquerda() { return panturrilhaEsquerda; } public void setPanturrilhaEsquerda(Double panturrilhaEsquerda) { this.panturrilhaEsquerda = panturrilhaEsquerda; }
    public Double getPanturrilhaDireita() { return panturrilhaDireita; } public void setPanturrilhaDireita(Double panturrilhaDireita) { this.panturrilhaDireita = panturrilhaDireita; }
}