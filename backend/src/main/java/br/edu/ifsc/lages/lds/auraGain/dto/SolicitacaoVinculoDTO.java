package br.edu.ifsc.lages.lds.auraGain.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object representing a connection request between a Student and a Personal Trainer.")
public class SolicitacaoVinculoDTO {
    @Schema(description = "Unique identifier of the connection request.", example = "10")
    private Long idVinculo;
    @Schema(description = "Full name of the student who sent or owns the request.", example = "John Doe")
    private String nomeAluno;
    @Schema(description = "Email of the student.", example = "john@example.com")
    private String emailAluno;
    @Schema(description = "Current status of the connection (e.g., PENDENTE, ACEITO, RECUSADO).", example = "PENDENTE")
    private String status;

    public SolicitacaoVinculoDTO(Long idVinculo, String nomeAluno, String emailAluno, String status) {
        this.idVinculo = idVinculo;
        this.nomeAluno = nomeAluno;
        this.emailAluno = emailAluno;
        this.status = status;
    }

    public Long getIdVinculo() { return idVinculo; }
    public void setIdVinculo(Long idVinculo) { this.idVinculo = idVinculo; }
    public String getNomeAluno() { return nomeAluno; }
    public void setNomeAluno(String nomeAluno) { this.nomeAluno = nomeAluno; }
    public String getEmailAluno() { return emailAluno; }
    public void setEmailAluno(String emailAluno) { this.emailAluno = emailAluno; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
