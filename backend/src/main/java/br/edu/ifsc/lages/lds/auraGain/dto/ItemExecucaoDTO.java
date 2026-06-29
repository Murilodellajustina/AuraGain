package br.edu.ifsc.lages.lds.auraGain.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object representing a specific exercise execution informing it's weight.")
public class ItemExecucaoDTO {
    @Schema(description = "The unique identifier of the workout of the exercise in the catalog.", example = "15", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long treinoExercicioId;
    @Schema(description = "The unique identifier of the exercise in the catalog.", example = "15", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long exercicioId;
    @Schema(description = "The weight lifted in the exercise.", example = "22", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer pesoUtilizado;

    public Long getTreinoExercicioId() { return treinoExercicioId; }
    public void setTreinoExercicioId(Long treinoExercicioId) { this.treinoExercicioId = treinoExercicioId; }
    public Long getExercicioId() { return exercicioId; }
    public void setExercicioId(Long exercicioId) { this.exercicioId = exercicioId; }
    public Integer getPesoUtilizado() { return pesoUtilizado; }
    public void setPesoUtilizado(Integer pesoUtilizado) { this.pesoUtilizado = pesoUtilizado; }
}