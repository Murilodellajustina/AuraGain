package br.edu.ifsc.lages.lds.auraGain.dto;

public class PesoDTO {

    private Long id;
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