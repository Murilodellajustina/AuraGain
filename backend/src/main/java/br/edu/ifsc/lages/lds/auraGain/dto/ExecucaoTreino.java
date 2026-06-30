package br.edu.ifsc.lages.lds.auraGain.dto;

import java.util.List;

@Schema(description = "Data Transfer Object representing a specific workout execution including it's exercises.")
public class ExecucaoTreinoDTO {
    private String emailUsuario;
    private List<ItemExecucaoDTO> exercicios;
    
    public String getEmailUsuario() { return emailUsuario; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
    public List<ItemExecucaoDTO> getExercicios() { return exercicios; }
    public void setExercicios(List<ItemExecucaoDTO> exercicios) { this.exercicios = exercicios; }
}