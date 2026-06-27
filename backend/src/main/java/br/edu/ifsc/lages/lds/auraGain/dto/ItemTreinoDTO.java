package br.edu.ifsc.lages.lds.auraGain.dto;

public class ItemTreinoDTO {
    private Long exercicioId;
    private Integer series;
    private Integer repeticoes;
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
