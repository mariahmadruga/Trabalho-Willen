import prisma from '../prisma.js';

// Criar uma nova lição com conteúdos (traduções/frases do aeroporto)
export const criarLicao = async (req, res) => {
  try {
    const { titulo, categoria, conteudos } = req.body;

    const novaLicao = await prisma.licao.create({
      data: {
        titulo,
        categoria,
        conteudos: {
          create: conteudos // Espera um array de ConteudoLicao
        }
      },
      include: {
        conteudos: true
      }
    });

    return res.status(201).json(novaLicao);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar a lição", detalhes: error.message });
  }
};

// Listar todas as lições com os respetivos conteúdos
export const listarLicoes = async (req, res) => {
  try {
    const licoes = await prisma.licao.findMany({
      include: {
        conteudos: true
      }
    });
    return res.json(licoes);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar as lições", detalhes: error.message });
  }
};
// Buscar uma lição específica pelo ID
export const buscarLicaoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const licao = await prisma.licao.findUnique({
      where: { id: Number(id) },
      include: { conteudos: true }
    });

    if (!licao) {
      return res.status(404).json({ erro: "Lição não encontrada" });
    }

    return res.json(licao);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar a lição", detalhes: error.message });
  }
};

// Atualizar uma lição
export const atualizarLicao = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, categoria } = req.body;

    const licaoAtualizada = await prisma.licao.update({
      where: { id: Number(id) },
      data: { titulo, categoria },
      include: { conteudos: true }
    });

    return res.json(licaoAtualizada);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar a lição", detalhes: error.message });
  }
};

// Apagar uma lição
export const deletarLicao = async (req, res) => {
  try {
    const { id } = req.params;

    // Apagar primeiro os conteúdos associados
    await prisma.conteudoLicao.deleteMany({
      where: { licaoId: Number(id) }
    });

    // Apagar a lição
    await prisma.licao.delete({
      where: { id: Number(id) }
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao apagar a lição", detalhes: error.message });
  }
};