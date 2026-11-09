import { Router } from 'express';
import { 
  criarLicao, 
  listarLicoes, 
  buscarLicaoPorId, 
  atualizarLicao, 
  deletarLicao 
} from '../controllers/licaoController.js';

const router = Router();

// Rotas para as lições do aeroporto
router.post('/licoes', criarLicao);
router.get('/licoes', listarLicoes);
router.get('/licoes/:id', buscarLicaoPorId);       // <-- Buscar lição específica
router.put('/licoes/:id', atualizarLicao);       // <-- Atualizar lição
router.delete('/licoes/:id', deletarLicao);    // <-- Apagar lição

export default router;