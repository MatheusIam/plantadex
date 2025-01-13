const fs = require("fs");
const path = require("path");

// Caminho da pasta raiz
const rootDir = process.cwd(); // Diretório atual do script
const outputFile = path.join(rootDir, "arquivos_tsx.txt");

// Pastas a serem ignoradas
const ignoreDirs = ["node_modules", ".expo"];

// Função para verificar se o arquivo tem extensão .tsx
function isTsxFile(file) {
  return path.extname(file) === ".tsx";
}

// Função para iterar pelos arquivos e diretórios
function iterateDirectory(directory) {
  console.log(`[INFO] Explorando o diretório: ${directory}`);
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const fullPath = path.join(directory, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      if (ignoreDirs.includes(item)) {
        console.log(`[SKIP] Ignorando o diretório: ${fullPath}`);
      } else {
        console.log(`[DIR] Entrando no diretório: ${fullPath}`);
        iterateDirectory(fullPath);
      }
    } else if (stats.isFile()) {
      if (isTsxFile(item)) {
        console.log(`[FILE] Encontrado arquivo .tsx: ${fullPath}`);
        appendFileContent(fullPath);
      } else {
        console.log(`[IGNORE] Ignorando arquivo: ${fullPath}`);
      }
    }
  });
}

// Função para adicionar o conteúdo do arquivo ao arquivo de saída
function appendFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const separator = `\n\n=== Conteúdo do arquivo: ${filePath} ===\n\n`;
    fs.appendFileSync(outputFile, separator + content);
    console.log(
      `[SUCCESS] Conteúdo do arquivo ${filePath} adicionado ao arquivo de saída.`
    );
  } catch (error) {
    console.error(
      `[ERROR] Erro ao ler ou escrever o arquivo: ${filePath}\n`,
      error
    );
  }
}

// Limpa o arquivo de saída antes de iniciar
try {
  fs.writeFileSync(outputFile, "");
  console.log(`[INIT] Arquivo de saída ${outputFile} limpo e pronto.`);
} catch (error) {
  console.error(
    `[ERROR] Não foi possível limpar o arquivo de saída: ${outputFile}\n`,
    error
  );
  process.exit(1);
}

// Inicia a iteração pelo diretório raiz
console.log("[START] Iniciando a busca por arquivos .tsx...");
iterateDirectory(rootDir);
console.log("[DONE] Processo concluído. Conteúdo salvo em:", outputFile);
