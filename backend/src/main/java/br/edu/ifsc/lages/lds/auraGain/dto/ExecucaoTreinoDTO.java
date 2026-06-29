package br.edu.ifsc.lages.lds.auraGain.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object representing a specific workout execution including it's exercises.")
public class ExecucaoTreinoDTO {
    @Schema(description = "The user's email identifier for the workout.", example = "user@gmail.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String emailUsuario;
    @Schema(description = "The lists of exercises for a user.", example = "Brench Press, Shoulder Press ...", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemExecucaoDTO> exercicios;
    
    public String getEmailUsuario() { return emailUsuario; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
    public List<ItemExecucaoDTO> getExercicios() { return exercicios; }
    public void setExercicios(List<ItemExecucaoDTO> exercicios) { this.exercicios = exercicios; }
}