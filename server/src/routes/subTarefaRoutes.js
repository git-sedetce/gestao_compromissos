const { Router } = require('express');
const SubTarefaController = require('../controllers/SubTarefaControllers');

const router = Router();
router.post('/newTask', SubTarefaController.cadastraTasks);
router.get('/allTask', SubTarefaController.todasTasks);
router.get('/taskById/:id', SubTarefaController.umaTask);
router.get('/taskTarefa/:id', SubTarefaController.umaTaskByTarefa);
router.get('/ordemTarefa/:id', SubTarefaController.ordem);
router.put('/updateTask/:id', SubTarefaController.atualizaTask);
router.patch('/updateTaskStatus/:id', SubTarefaController.atualizaTaskStatus);
router.delete('/deleteTask/:id', SubTarefaController.deletaTask);

module.exports = router