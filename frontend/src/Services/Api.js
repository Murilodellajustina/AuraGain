import { useEffect, useState } from "react";
import axios from "axios";

export async function listarExercicios() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Você precisa estar logado para ver suas solicitações.");
    }
    const response = await fetch(
        "http://localhost:8080/api/exercicios",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao carregar treinos");
    }

    return response.json();
}