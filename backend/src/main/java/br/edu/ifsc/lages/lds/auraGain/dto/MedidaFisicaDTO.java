package br.edu.ifsc.lages.lds.auraGain.dto;

import java.time.LocalDate;

public class MedidaFisicaDTO {
    private Long id;
    private String emailUsuario;
    private LocalDate dataAvaliacao;
    private Double peso, altura, imc, torax, cintura, quadril, bracoEsquerdo, bracoDireito, coxaEsquerda, coxaDireita, panturrilhaEsquerda, panturrilhaDireita;

    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getEmailUsuario() { return emailUsuario; } public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
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