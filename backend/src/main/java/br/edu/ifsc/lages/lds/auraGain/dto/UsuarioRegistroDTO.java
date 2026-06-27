package br.edu.ifsc.lages.lds.auraGain.dto;

import br.edu.ifsc.lages.lds.auraGain.model.Usuario.TipoPerfil;

public class UsuarioRegistroDTO {
    private String nome;
    private String email;
    private String senha;
    private TipoPerfil perfil;
    private String cref;
    private String biografia;
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
