# Formatador e Validador de JSON Avançado

<img width="400" height="224" alt="Gravação de Tela 2026-05-21 112846" src="https://github.com/user-attachments/assets/692476f9-9862-41df-9471-81ab964f57d2" />


Uma ferramenta web leve, performática e focada na produtividade de desenvolvedores e analistas técnico-operacionais. Permite a validação estrutural de dados no formato JSON, além de oferecer recursos essenciais de formatação, minificação e manipulação de objetos diretamente no navegador.

> **Acesse a aplicação rodando ao vivo:** [Link do seu GitHub Pages ou Vercel aqui]

---

## 💡 Motivação do Projeto

Quem atua na área de **Implantação de Sistemas e Integrações** sabe o quão comum é lidar diariamente com cargas de dados massivas, arquivos de configuração corrompidos e logs bagunçados. O preenchimento manual ou a conferência de dados estruturados geram gargalos operacionais imensos.

Este projeto foi desenvolvido com foco em resolver essa dor de forma limpa:
1. **Segurança total:** Nenhum dado é enviado para servidores externos. Todo o processamento e validação ocorrem localmente no client-side (browser).
2. **Normalização de Cargas:** A funcionalidade de ordenação alfabética de chaves permite comparar visualmente objetos de payloads distintos de forma imediata.

---

## 🛠️ Recursos e Funcionalidades

*   **Validação Estrutural:** Identificação instantânea de quebras de sintaxe através de análise defensiva (`try...catch`).
*   **Embelezamento Dinâmico (Prettify):** Formatação parametrizável com controle dinâmico de indentação (2 ou 4 espaços).
*   **Minificação Extrema:** Remoção completa de quebras de linha e espaços em branco para otimização de tráfego de dados.
*   **Ordenação Alfabética:** Reordenação automática das chaves de primeiro nível do objeto (via `Object.keys` e `sort`).
*   **Exportação Prática:** Cópia rápida para o clipboard com feedback assíncrono na UI e download nativo do arquivo `.json` gerado.

---

## ⚙️ Conceitos Técnicos Aplicados

Para construir esta ferramenta sem depender de frameworks externos (Vanilla JS), apliquei conceitos fundamentais de engenharia de software:

*   **Princípio DRY (Don't Repeat Yourself):** Centralização de validações e leitura de estados através de funções utilitárias puras (`obterJsonValido`, `verificaCampoVazio`).
*   **Manipulação de Estado Dinâmico:** Gerenciamento do comportamento da interface dependendo das ações do usuário (recuos ativos, estados de erro controlados via inserção/remoção de classes CSS).
*   **Asynchronicity & Web APIs:** Uso de `setTimeout` para controle de feedback visual e consumo das APIs nativas `navigator.clipboard` e manipulação de binários com `Blob` e `URL.createObjectURL` para downloads.

---

## 🚀 Como Executar Localmente

Como o projeto utiliza tecnologias nativas da web, não há necessidade de instalar dependências.

1. Clone o repositório:
   ```bash
   git clone https://github.com/avila-helyf/Validador-JSON.git
