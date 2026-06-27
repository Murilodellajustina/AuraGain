package br.edu.ifsc.lages.lds.auraGain.dto;

public class SolicitacaoVinculoDTO {
    private Long idVinculo;
    private String nomeAluno;
    private String emailAluno;
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
