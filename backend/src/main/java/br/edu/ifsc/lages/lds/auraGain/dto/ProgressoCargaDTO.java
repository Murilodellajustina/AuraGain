package br.edu.ifsc.lages.lds.auraGain.dto;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object representing a weight lifted in a exercise.")
public class ProgressoCargaDTO {
    @Schema(description = "The date when registered the weight.", example = "15/05/2026", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDate data;
    @Schema(description = "The weight informed in the exercise.", example = "24", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer peso;

    public ProgressoCargaDTO(LocalDate data, Integer peso) {
        this.data = data;
        this.peso = peso;
    }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public Integer getPeso() { return peso; }
    public void setPeso(Integer peso) { this.peso = peso; }
}
