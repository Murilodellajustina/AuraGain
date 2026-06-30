package br.edu.ifsc.lages.lds.auraGain.service;

import br.edu.ifsc.lages.lds.auraGain.dto.MedidaFisicaDTO;
import br.edu.ifsc.lages.lds.auraGain.model.MedidaFisica;
import br.edu.ifsc.lages.lds.auraGain.model.Usuario;
import br.edu.ifsc.lages.lds.auraGain.repository.MedidaFisicaRepository;
import br.edu.ifsc.lages.lds.auraGain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class MedidaFisicaService {

    @Autowired private MedidaFisicaRepository medidaRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    public MedidaFisica registrarMedidas(MedidaFisicaDTO dto) throws Exception {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmailUsuario())
                .orElseThrow(() -> new Exception("Usuário não encontrado."));

        MedidaFisica medida = new MedidaFisica();
        medida.setUsuario(usuario);
        medida.setDataAvaliacao(LocalDate.now()); 
        
        medida.setPeso(dto.getPeso());
        medida.setAltura(dto.getAltura());
        
        if (dto.getPeso() != null && dto.getAltura() != null && dto.getAltura() > 0) {
            double imcCalculado = dto.getPeso() / (dto.getAltura() * dto.getAltura());
            medida.setImc(Math.round(imcCalculado * 100.0) / 100.0);
        }

        medida.setTorax(dto.getTorax());
        medida.setCintura(dto.getCintura());
        medida.setQuadril(dto.getQuadril());
        medida.setBracoEsquerdo(dto.getBracoEsquerdo());
        medida.setBracoDireito(dto.getBracoDireito());
        medida.setCoxaEsquerda(dto.getCoxaEsquerda());
        medida.setCoxaDireita(dto.getCoxaDireita());
        medida.setPanturrilhaEsquerda(dto.getPanturrilhaEsquerda());
        medida.setPanturrilhaDireita(dto.getPanturrilhaDireita());

        return medidaRepository.save(medida);
    }

    public List<MedidaFisica> buscarHistorico(String email) {
        return medidaRepository.findByUsuarioEmailOrderByDataAvaliacaoAsc(email);
    }
}