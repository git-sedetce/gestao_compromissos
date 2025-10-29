const { Router } = require('express');
const TarefaController = require('../controllers/TarefaControllers');

const router = Router();
router.post('/newTarefa', TarefaController.cadastraTarefa);
router.get('/allTarefa', TarefaController.todasTarefa);
router.get('/tarefaById/:id', TarefaController.umTarefa);
router.get('/tarefaByProjeto/:id', TarefaController.tarefaByProjeto);
router.get('/ordemExecucao/:id', TarefaController.ordem);
router.get('/task/:id', TarefaController.task);
router.put('/updateTarefa/:id', TarefaController.atualizaTarefa);
router.patch('/updateTarefaStatus/:id', TarefaController.atualizaTarefaStatus);
router.delete('/deleteTarefa/:id', TarefaController.deletaTarefa);

module.exports = router