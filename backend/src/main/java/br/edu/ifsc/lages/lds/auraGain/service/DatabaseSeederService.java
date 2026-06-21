package br.edu.ifsc.lages.lds.auraGain.service;

import br.edu.ifsc.lages.lds.auraGain.model.Exercicio;
import br.edu.ifsc.lages.lds.auraGain.repository.ExercicioRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class DatabaseSeederService {

    private final ExercicioRepository exercicioRepository;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public DatabaseSeederService(ExercicioRepository exercicioRepository) {
        this.exercicioRepository = exercicioRepository;
        this.objectMapper = new ObjectMapper();
        this.restClient = RestClient.builder().build(); 
    }

    @EventListener(ApplicationReadyEvent.class)
    public void popularBancoInicial() {
        
        if (exercicioRepository.count() == 0) {
            System.out.println(">>> Banco vazio. Conectando ao repositório open-source no GitHub...");
            List<Exercicio> exerciciosParaSalvar = new ArrayList<>();

            try {
                String urlGitHub = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
                
                String jsonResponse = restClient.get()
                        .uri(urlGitHub)
                        .retrieve()
                        .body(String.class);

                if (jsonResponse != null && !jsonResponse.isEmpty()) {
                    JsonNode root = objectMapper.readTree(jsonResponse);

                    if (root.isArray()) {
                        for (JsonNode node : root) {
                            
                            String name = node.hasNonNull("name") ? node.get("name").asText() : "";
                            if (name.trim().isEmpty()) {
                                continue; 
                            }

                            Exercicio ex = new Exercicio();
                            ex.setNome(name);

                            StringBuilder instrucoesAcumuladas = new StringBuilder();
                            if (node.hasNonNull("instructions") && node.get("instructions").isArray()) {
                                for (JsonNode passo : node.get("instructions")) {
                                    instrucoesAcumuladas.append(passo.asText()).append(" ");
                                }
                            }
                            String descFinal = instrucoesAcumuladas.toString().trim();
                            ex.setDescricao(descFinal.isEmpty() ? "No description available." : descFinal);

                            ex.setNivel(node.hasNonNull("level") ? node.get("level").asText() : "N/A");
                            ex.setEquipamento(node.hasNonNull("equipment") ? node.get("equipment").asText() : "N/A");

                            StringBuilder musculosAcumulados = new StringBuilder();
                            if (node.hasNonNull("primaryMuscles") && node.get("primaryMuscles").isArray()) {
                                for (JsonNode musculo : node.get("primaryMuscles")) {
                                    if (musculosAcumulados.length() > 0) {
                                        musculosAcumulados.append(", ");
                                    }
                                    musculosAcumulados.append(musculo.asText());
                                }
                            }
                            ex.setMusculoPrincipal(musculosAcumulados.length() > 0 ? musculosAcumulados.toString() : "N/A");

                            exerciciosParaSalvar.add(ex);
                            
                            // salva apenas 120 exercícios
                            if (exerciciosParaSalvar.size() >= 120) {
                                break;
                            }
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println(">>> ERRO CRÍTICO NA EXTRAÇÃO DE DADOS: " + e.getMessage());
            }

            if (!exerciciosParaSalvar.isEmpty()) {
                exercicioRepository.saveAll(exerciciosParaSalvar);
                System.out.println(">>> CONEXÃO ESTÁVEL: " + exerciciosParaSalvar.size() + " exercícios completos persistidos com sucesso!");
            } else {
                System.err.println(">>> Falha na coleta de dados externos. Inicializando em modo de contingência.");
                exerciciosParaSalvar.add(new Exercicio(null, "Barbell Bench Press", "Lie down on a flat bench. Grip the barbell...", "intermediate", "barbell", "chest"));
                exercicioRepository.saveAll(exerciciosParaSalvar);
            }
        } else {
            System.out.println(">>> O catálogo de exercícios já contém dados armazenados. Nenhuma ação executada.");
        }
    }
}