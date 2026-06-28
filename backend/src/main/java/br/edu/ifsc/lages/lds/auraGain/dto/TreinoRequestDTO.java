package br.edu.ifsc.lages.lds.auraGain.dto;

import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object for creating a new workout routine.")
public class TreinoRequestDTO {
    @Schema(description = "The identifier for the workout day (e.g., A, B, C).", example = "A", requiredMode = Schema.RequiredMode.REQUIRED)
    private String diaFicha;
    @Schema(description = "The email of the student who owns this workout routine.", example = "user@email.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String emailUsuario;
    @Schema(description = "List of exercises included in this workout routine.", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ItemTreinoDTO> exercicios;

    public String getDiaFicha() { return diaFicha; }
    public void setDiaFicha(String diaFicha) { this.diaFicha = diaFicha; }
    public String getEmailUsuario() { return emailUsuario; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
    public List<ItemTreinoDTO> getExercicios() { return exercicios; }
    public void setExercicios(List<ItemTreinoDTO> exercicios) { this.exercicios = exercicios; }
}
