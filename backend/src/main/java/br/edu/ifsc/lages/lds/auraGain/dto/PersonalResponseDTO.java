package br.edu.ifsc.lages.lds.auraGain.dto;

public class PersonalResponseDTO {
    private Long id;
    private String nome;
    private String fotoPerfil;
    private String cref;
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
