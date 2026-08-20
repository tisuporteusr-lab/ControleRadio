# GUIA DE INSTALAÇÃO E ACESSO EM REDE (WINDOWS SERVER / SRVTI)

## 📌 Dados do Servidor
- **Nome do Servidor (Hostname):** `srvti`
- **IP Fixo Configurado:** `10.10.1.100`
- **Porta do Sistema:** `3050`
- **URLs de Acesso:**
  - Pelo nome do servidor: **`http://srvti:3050`**
  - Pelo IP fixo: **`http://10.10.1.100:3050`**
  - Localmente no próprio servidor: **`http://localhost:3050`**

---

## 🚀 Arquivos de Controle Criados

1. **`INICIAR_SISTEMA.bat`**  
   Inicia o sistema na porta 3050 em modo de primeiro plano (com janela de console para monitoramento).

2. **`PARAR_SISTEMA_PORTA.bat`**  
   Localiza e finaliza especificamente o processo que está rodando na porta **3050** (usando `netstat` e `taskkill`).

3. **`PARAR_SISTEMA_TOTAL.bat`**  
   Encerra todos os processos do Node.js de forma forçada e limpa.

4. **`CONFIGURAR_INICIALIZACAO_AUTOMATICA.bat`**  
   Executa uma única vez como Administrador para configurar o sistema para iniciar **automaticamente com o Windows** (em segundo plano, sem janela preta aberta).

---

## 🌐 Como Acessar usando o Nome `srvti:3050`

Para que qualquer máquina da sua rede acesse diretamente por `http://srvti:3050`, verifique:

1. **Firewall do Windows (no servidor `srvti`):**
   Liberar a porta **3050 TCP** no Firewall do Windows executando no Prompt de Comando (como Administrador):
   ```cmd
   netsh advfirewall firewall add rule name="Sistema Radios Porta 3050" dir=in action=allow protocol=TCP localport=3050
   ```

2. **Resolução de Nome DNS / NetBIOS / WINS / Hosts:**
   - Em redes com Active Directory / DNS interno corporativo, o nome `srvti` já resolve automaticamente para `10.10.1.100`.
   - Se por acaso alguma estação específica não resolver pelo nome, basta adicionar uma linha no arquivo `C:\Windows\System32\drivers\etc\hosts` das máquinas clientes:
     ```
     10.10.1.100    srvti
     ```
