import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateManualInstalacaoPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor: [number, number, number] = [180, 83, 9]; // Amber-700
  const darkColor: [number, number, number] = [28, 25, 23]; // Stone-900
  const grayColor: [number, number, number] = [120, 113, 108]; // Stone-500
  const lightBg: [number, number, number] = [250, 247, 240]; // Light beige
  const cardBorder: [number, number, number] = [229, 222, 201]; // Beige border

  // --- HEADER & TITLE ---
  doc.setFillColor(...darkColor);
  doc.rect(0, 0, 210, 32, 'F');

  // Amber decorative accent line
  doc.setFillColor(...primaryColor);
  doc.rect(0, 32, 210, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('GUIA OFICIAL DE INSTALAÇÃO E IMPLANTAÇÃO', 14, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(245, 158, 11);
  doc.text('Sistema de Gestão e Controle de Rádios Motorola DP450 • Locação Mendonça', 14, 23);

  // Document metadata box
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...cardBorder);
  doc.roundedRect(14, 38, 182, 20, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Versão do Sistema:', 18, 44);
  doc.setFont('helvetica', 'normal');
  doc.text('v1.0.0 (Full-Stack Express + React + SQLite)', 50, 44);

  doc.setFont('helvetica', 'bold');
  doc.text('Ambiente:', 18, 50);
  doc.setFont('helvetica', 'normal');
  doc.text('Servidor Local / Rede Corporativa / Nuvem', 50, 50);

  doc.setFont('helvetica', 'bold');
  doc.text('Data do Documento:', 115, 44);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString('pt-BR'), 150, 44);

  doc.setFont('helvetica', 'bold');
  doc.text('Acesso Padrão:', 115, 50);
  doc.setFont('helvetica', 'normal');
  doc.text('admin@admin.com / admin123', 150, 50);

  let currentY = 64;

  // --- SEÇÃO 1: REQUISITOS DO SISTEMA ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('1. REQUISITOS MÍNIMOS DE SISTEMA', 14, currentY);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Componente', 'Requisito Mínimo', 'Observações']],
    body: [
      ['Node.js', 'Versão 18.x ou superior (Recomendado v20 ou v22 LTS)', 'Disponível gratuitamente em nodejs.org'],
      ['NPM', 'Versão 9.x ou superior', 'Instalado automaticamente com o Node.js'],
      ['Sistema Operacional', 'Windows 10/11/Server, Linux (Ubuntu/Debian) ou macOS', 'Compatibilidade universal (Multiplataforma)'],
      ['Memória RAM', '512 MB livres de RAM', 'Sistema leve e de alto desempenho'],
      ['Espaço em Disco', '200 MB para o sistema + espaço para PDFs anexados', 'Armazenamento em banco local SQLite'],
      ['Navegador Web', 'Google Chrome, Microsoft Edge, Firefox, Safari ou Opera', 'Acesso via computador, tablet ou smartphone']
    ],
    theme: 'grid',
    headStyles: {
      fillColor: darkColor,
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [40, 40, 40],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = (doc as any).lastAutoTable.finalY + 9;

  // --- SEÇÃO 2: PASSO A PASSO DE INSTALAÇÃO ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('2. PASSO A PASSO DE INSTALAÇÃO NO SERVIDOR OU COMPUTADOR', 14, currentY);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Passo', 'Comando / Ação', 'Descrição Detalhada']],
    body: [
      [
        'Passo 1',
        'Extrair Arquivos',
        'Extraia todos os arquivos do projeto em uma pasta permanente (Exemplo: C:\\Sistemas\\controle-radios ou /opt/controle-radios).'
      ],
      [
        'Passo 2',
        'npm install',
        'Abra o terminal (Prompt de Comando, PowerShell ou Terminal Linux) na pasta do projeto e instale as dependências executando: npm install'
      ],
      [
        'Passo 3',
        'Configuração .env (Opcional)',
        'O sistema já possui valores padrão seguros. Caso deseje personalizar o segredo JWT, crie o arquivo .env com a variável JWT_SECRET=sua_chave_secreta.'
      ],
      [
        'Passo 4',
        'npm run build',
        'Compile a aplicação para o modo de produção otimizado com o comando: npm run build (Gera os arquivos em dist/).'
      ],
      [
        'Passo 5',
        'npm start',
        'Inicie o servidor de produção com: npm start (O servidor ficará ativo ouvindo na porta 3000).'
      ],
      [
        'Desenvolvimento',
        'npm run dev',
        'Caso queira rodar em modo de testes/desenvolvimento com recarregamento em tempo real, utilize: npm run dev'
      ]
    ],
    theme: 'grid',
    headStyles: {
      fillColor: darkColor,
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [40, 40, 40],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = (doc as any).lastAutoTable.finalY + 9;

  // Check if need new page
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }

  // --- SEÇÃO 3: ACESSO AO SISTEMA E REDE LOCAL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('3. COMO ACESSAR O SISTEMA', 14, currentY);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Tipo de Acesso', 'Endereço (URL)', 'Instruções']],
    body: [
      ['No Próprio Computador', 'http://localhost:3000', 'Basta abrir qualquer navegador na mesma máquina onde o sistema está rodando.'],
      ['Em outros PCs da Rede', 'http://IP_DO_SERVIDOR:3000', 'Exemplo: http://192.168.1.100:3000 (Libere a porta 3000 no Firewall do Windows/Linux).'],
      ['Credencial Administrador', 'admin@admin.com\nSenha: admin123', 'Usuário mestre com permissão total para cadastrar rádios, setores e novos operadores.']
    ],
    theme: 'grid',
    headStyles: {
      fillColor: darkColor,
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [40, 40, 40],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = (doc as any).lastAutoTable.finalY + 9;

  // Add Page 2 for Persistence & 24/7 Service Setup
  doc.addPage();
  currentY = 20;

  // --- HEADER PAGE 2 ---
  doc.setFillColor(...darkColor);
  doc.rect(0, 0, 210, 16, 'F');
  doc.setFillColor(...primaryColor);
  doc.rect(0, 16, 210, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('GUIA DE INSTALAÇÃO E OPERAÇÃO • PARTE 2: BACKUP E EXECUÇÃO 24/7', 14, 11);

  currentY = 26;

  // --- SEÇÃO 4: BANCO DE DADOS, ARQUIVOS E BACKUP ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('4. ESTRUTURA DO BANCO DE DADOS E ROTINA DE BACKUP', 14, currentY);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Item / Pasta', 'Localização', 'O que contém']],
    body: [
      ['Banco de Dados SQLite', 'data/radios.sqlite', 'Contém todos os cadastros de usuários, rádios, setores, manutenções e histórico de envios.'],
      ['Termos de Uso (PDF)', 'data/termos/', 'Pasta onde são armazenados os arquivos PDF dos termos de responsabilidade anexados.'],
      ['Pasta de Backup Completo', 'data/', 'Para fazer backup diário, basta copiar a pasta "data" inteira para um pendrive, HD externo ou nuvem.']
    ],
    theme: 'grid',
    headStyles: {
      fillColor: darkColor,
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [40, 40, 40],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = (doc as any).lastAutoTable.finalY + 8;

  // Box: Como Restaurar o Backup
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...cardBorder);
  doc.roundedRect(14, currentY, 182, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkColor);
  doc.text('Como Restaurar o Backup em uma Nova Instalação:', 18, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.text('1. Instale o sistema normalmente no novo computador com "npm install" e "npm run build".', 18, currentY + 12);
  doc.text('2. Cole a pasta "data" salva anteriormente na raiz do novo projeto.', 18, currentY + 17);
  doc.text('3. Inicie o sistema com "npm start". Todos os seus rádios, usuários e PDFs reaparecerão imediatamente!', 18, currentY + 22);

  currentY += 32;

  // --- SEÇÃO 5: CONFIGURAR EXECUÇÃO AUTOMÁTICA EM SEGUNDO PLANO (24/7 COM PM2) ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('5. INICIALIZAÇÃO AUTOMÁTICA EM SERVIDORES (WINDOWS OU LINUX COM PM2)', 14, currentY);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Passo', 'Comando', 'Finalidade']],
    body: [
      [
        '1. Instalar PM2',
        'npm install -g pm2',
        'Instala o gerenciador de processos em segundo plano mundialmente adotado para Node.js.'
      ],
      [
        '2. Iniciar Aplicação',
        'pm2 start dist/server.cjs --name "controle-radios"',
        'Inicia o sistema em segundo plano sem necessidade de manter uma janela de terminal aberta.'
      ],
      [
        '3. Configurar Inicialização',
        'pm2 startup\npm2 save',
        'Faz com que o sistema inicie sozinho automaticamente sempre que o computador/servidor for ligado ou reiniciado.'
      ],
      [
        '4. Comandos Úteis',
        'pm2 status (ver estado)\npm2 restart controle-radios\npm2 logs (ver logs)',
        'Comandos para monitoramento rápido da saúde do sistema.'
      ]
    ],
    theme: 'grid',
    headStyles: {
      fillColor: darkColor,
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [40, 40, 40],
    },
    margin: { left: 14, right: 14 },
  });

  currentY = (doc as any).lastAutoTable.finalY + 8;

  // Box: Suporte e Contato
  doc.setFillColor(245, 245, 244);
  doc.setDrawColor(214, 211, 209);
  doc.roundedRect(14, currentY, 182, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkColor);
  doc.text('Suporte e Manutenção dos Equipamentos:', 18, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text('Fornecedor de Locação: Mendonça Comunicação & Rádios • Modelo: Motorola DP450', 18, currentY + 12);

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(...grayColor);
    doc.text(`Manual de Instalação e Implantação • Sistema de Controle de Rádios`, 14, 290);
    doc.text(`Página ${i} de ${totalPages}`, 196, 290, { align: 'right' });
  }

  // Save/download the PDF
  doc.save('manual-instalacao-controle-radios.pdf');
}
