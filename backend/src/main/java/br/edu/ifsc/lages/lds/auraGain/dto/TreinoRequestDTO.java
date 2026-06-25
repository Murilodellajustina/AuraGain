package br.edu.ifsc.lages.lds.auraGain.dto;

import java.util.List;

public class TreinoRequestDTO {
    private String diaFicha;
    private String emailUsuario;
    private List<ItemTreinoDTO> exercicios;

    public String getDiaFicha() { return diaFicha; }
    public void setDiaFicha(String diaFicha) { this.diaFicha = diaFicha; }
    public String getEmailUsuario() { return emailUsuario; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
    public List<ItemTreinoDTO> getExercicios() { return exercicios; }
    public void setExercicios(List<ItemTreinoDTO> exercicios) { this.exercicios = exercicios; }
}
