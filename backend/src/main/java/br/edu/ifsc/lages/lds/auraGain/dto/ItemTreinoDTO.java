package br.edu.ifsc.lages.lds.auraGain.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object representing a specific exercise execution within a workout routine.")
public class ItemTreinoDTO {
    @Schema(description = "The unique identifier of the exercise in the catalog.", example = "15", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long exercicioId;
    @Schema(description = "Number of sets to perform.", example = "4", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer series;
    @Schema(description = "Target number of repetitions per set.", example = "12", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer repeticoes;
    @Schema(description = "Weight to be used in kilograms (kg).", example = "60")
    private Integer pesos;

    public Long getExercicioId() { return exercicioId; }
    public void setExercicioId(Long exercicioId) { this.exercicioId = exercicioId; }
    
    public Integer getSeries() { return series; }
    public void setSeries(Integer series) { this.series = series; }
    
    public Integer getRepeticoes() { return repeticoes; }
    public void setRepeticoes(Integer repeticoes) { this.repeticoes = repeticoes; }

    
    public Integer getPesos() { return pesos; }
    public void setOesos(Integer pesos) { this.pesos = pesos; }
}
