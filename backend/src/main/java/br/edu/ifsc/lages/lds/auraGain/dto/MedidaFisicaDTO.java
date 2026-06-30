package br.edu.ifsc.lages.lds.auraGain.dto;

import java.time.LocalDate;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object for user's measures.")
public class MedidaFisicaDTO {
    @Schema(description = "The unique identifier of the measures for a user.", example = "15", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;
    @Schema(description = "User email.", example = "user@gmail.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String emailUsuario;
    @Schema(description = "Registers when the measures were informed", example = "29/06/2026", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDate dataAvaliacao;
    @Schema(description = "User measures.", example = "90.8, 1.89 ...", requiredMode = Schema.RequiredMode.REQUIRED)
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