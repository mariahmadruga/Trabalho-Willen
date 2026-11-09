import prisma from '../prisma.js';
import bcrypt from 'bcryptjs';

const saltRounds = 12;

// Registo de novo utilizador
export const registrar = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (typeof email !== 'string' || typeof senha !== 'string' || !email.trim() || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios." });
    }

    const emailNormalizado = email.trim().toLowerCase();

    // Verificar se o utilizador já existe
    const senhaHash = await bcrypt.hash(senha, saltRounds);
    const novoUsuario = await prisma.usuario.create({
      data: {
        email: emailNormalizado,
        senha: senhaHash
      }
    });

    return res.status(201).json({
      mensagem: "Utilizador registado com sucesso!",
      usuarioId: novoUsuario.id,
      email: novoUsuario.email,
      usuario: {
        id: novoUsuario.id,
        email: novoUsuario.email
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ erro: "Este email já está registado." });
    }
    console.error('Erro ao registar utilizador:', error);
    return res.status(500).json({ erro: "Erro ao registar utilizador." });
  }
};

// Login de utilizador
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação básica dos campos
    if (typeof email !== 'string' || typeof senha !== 'string' || !email.trim() || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios." });
    }

    const emailNormalizado = email.trim().toLowerCase();

    // Procurar o utilizador pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email: emailNormalizado }
    });

    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha incorretos." });
    }

    const senhaTemHash = /^\$2[aby]\$\d{2}\$/.test(usuario.senha);
    const senhaValida = senhaTemHash
      ? await bcrypt.compare(senha, usuario.senha)
      : usuario.senha === senha;

    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha incorretos." });
    }

    if (!senhaTemHash) {
      const senhaHash = await bcrypt.hash(senha, saltRounds);
      await prisma.usuario.update({
        where: { id: usuario.id },
        data: { senha: senhaHash }
      });
    }

    return res.status(200).json({
      mensagem: "Login efetuado com sucesso!",
      usuarioId: usuario.id,
      email: usuario.email,
      usuario: {
        id: usuario.id,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Erro ao efetuar login:', error);
    return res.status(500).json({ erro: "Erro ao efetuar login." });
  }
};
