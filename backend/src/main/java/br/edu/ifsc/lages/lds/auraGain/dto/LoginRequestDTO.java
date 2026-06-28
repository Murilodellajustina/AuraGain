package br.edu.ifsc.lages.lds.auraGain.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object for user authentication.")
public class LoginRequestDTO {
    @Schema(description = "Registered email address.", example = "lucas@email.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;
    @Schema(description = "User password.", example = "securePass123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String senha;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}