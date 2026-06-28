package br.edu.ifsc.lages.lds.auraGain.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data Transfer Object representing public information of a Personal Trainer.")
public class PersonalResponseDTO {  
    @Schema(description = "Unique identifier of the Personal Trainer.", example = "5")
    private Long id;
    @Schema(description = "Full name of the Personal Trainer.", example = "Arnold Schwarzenegger")
    private String nome;
    @Schema(description = "URL of the profile picture.", example = "https://imgur.com/arnold.jpg")
    private String fotoPerfil;
    @Schema(description = "Professional registration number (CREF).", example = "987654-G/SP")
    private String cref;
    @Schema(description = "Professional biography and specialties.", example = "7x Mr. Olympia, specializing in bodybuilding.")
    private String biografia;

    public PersonalResponseDTO(Long id, String nome, String fotoPerfil, String cref, String biografia) {
        this.id = id;
        this.nome = nome;
        this.fotoPerfil = fotoPerfil;
        this.cref = cref;
        this.biografia = biografia;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getFotoPerfil() { return fotoPerfil; }
    public void setFotoPerfil(String fotoPerfil) { this.fotoPerfil = fotoPerfil; }
    public String getCref() { return cref; }
    public void setCref(String cref) { this.cref = cref; }
    public String getBiografia() { return biografia; }
    public void setBiografia(String biografia) { this.biografia = biografia; }
}
