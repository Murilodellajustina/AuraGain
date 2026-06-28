package br.edu.ifsc.lages.lds.auraGain.dto;

import br.edu.ifsc.lages.lds.auraGain.model.Usuario.TipoPerfil;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object for registering a new user (Student or Personal Trainer).")
public class UsuarioRegistroDTO {
    @Schema(description = "Full name of the user.", example = "User Jr.", requiredMode = Schema.RequiredMode.REQUIRED)
    private String nome;
    @Schema(description = "Valid email address for login.", example = "user@email.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;
    @Schema(description = "Account password.", example = "securePass123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String senha;
    @Schema(description = "Type of account to be created. Can be ALUNO (Student) or PERSONAL (Trainer).", example = "PERSONAL", requiredMode = Schema.RequiredMode.REQUIRED)
    private TipoPerfil perfil;
    @Schema(description = "Professional registration number (CREF). Required only if the profile is PERSONAL.", example = "123456-G/SC")
    private String cref;
    @Schema(description = "A brief presentation of the professional and their training method.", example = "Specialist in hypertrophy and weight loss.")
    private String biografia;
    @Schema(description = "Direct URL to the profile picture hosted on the internet.", example = "https://imgur.com/myphoto.jpg")
    private String fotoPerfil;

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public TipoPerfil getPerfil() { return perfil; }
    public void setPerfil(TipoPerfil perfil) { this.perfil = perfil; }
    public String getCref() { return cref; }
    public void setCref(String cref) { this.cref = cref; }
    public String getBiografia() { return biografia; }
    public void setBiografia(String biografia) { this.biografia = biografia; }
    public String getFotoPerfil() { return fotoPerfil; }
    public void setFotoPerfil(String fotoPerfil) { this.fotoPerfil = fotoPerfil; }
}
