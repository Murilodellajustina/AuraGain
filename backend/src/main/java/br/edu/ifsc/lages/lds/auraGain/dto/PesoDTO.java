package br.edu.ifsc.lages.lds.auraGain.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object for updating or recording user weight.")
public class PesoDTO {
    @Schema(description = "Unique identifier of the weight record or user.", example = "1")
    private Long id;
    @Schema(description = "Body weight in kilograms.", example = "85")
    private Integer peso;

    public PesoDTO() {
    }

    public PesoDTO(Long id, Integer peso) {
        this.id = id;
        this.peso = peso;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPeso() {
        return peso;
    }

    public void setPeso(Integer peso) {
        this.peso = peso;
    }
}