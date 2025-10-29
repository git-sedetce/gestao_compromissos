const { Router } = require('express');
const ProjectController = require('../controllers/ProjectControllers.js');

const router = Router();
router.post('/newProject', ProjectController.cadastraProjetos);
router.post('/newMembers', ProjectController.cadastraMembros);
router.get('/allProject', ProjectController.todosProjetos);
router.get('/project', ProjectController.projetosCadastrados);
router.get('/projectById/:id', ProjectController.umProjeto);
router.get('/projectId/:id', ProjectController.onlyProject);
router.get('/consultaProjeto/:id', ProjectController.consultaProjeto)
router.get('/responsabilidade', ProjectController.consultaResp)
router.get('/responsabilidadeById/:id', ProjectController.getResp)

router.get('/allStatus', ProjectController.todosStatus);

router.get('/usersProjects', ProjectController.getUsersProjects);
router.get('/usersProjectById/:id', ProjectController.getUsersProjectById);
router.get('/usersProjectByIdNot/:id', ProjectController.getUsersProjectByIdNot);
router.get('/userProject/:id', ProjectController.getUserProject);
router.put('/updateMembro/:id', ProjectController.atualizaMembro);
router.delete('/deleteMembro/:id', ProjectController.deletaMembro);
router.get('/projetoComCronogramasETarefas/:id', ProjectController.projetoComCronogramasETarefas);

router.get('/projetoDetalhes/:id', ProjectController.getProjetoDetalhes);
router.patch('/updateProjectStatus/:id', ProjectController.updateProjectStatus);
router.put('/arquivarProject/:id', ProjectController.arquivaProjeto);
router.put('/updatedProjeto/:id', ProjectController.atualizaProjeto);

module.exports = router