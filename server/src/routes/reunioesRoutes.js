const { Router } = require('express');
const ReunioesController = require('../controllers/ReunioesControllers.js');

const fs = require('fs');
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pastaUploads = path.join(__dirname, '../storage/uploads/atas');
        verificarECriarPasta(pastaUploads);
        //cb(null, __dirname + '../../../../conerge/src/assets/uploads/atas/reunioes_ordinarias')
        cb(null, pastaUploads)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '_ata_ordinaria_' + file.originalname)
    }
})

// Função para verificar se a pasta existe e criar se não existir
function verificarECriarPasta(pastaPath) {
    if (!fs.existsSync(pastaPath)) {
        fs.mkdirSync(pastaPath, { recursive: true });
        console.log(`A pasta ${pastaPath} foi criada.`);
    } else {
        console.log(`A pasta ${pastaPath} já existe.`);
    }
  }

const upload = multer({ storage })

const router = Router();
router.post('/newMeet', ReunioesController.cadastraReunioes);
router.get('/allMeet', ReunioesController.allReunioes);
router.get('/meetById/:id', ReunioesController.umaReuniao);
router.get('/meetByMeet/:id', ReunioesController.meetByProject);
router.get('/meetByReg/:id', ReunioesController.meetByRegister);
router.get('/listaPeriodicidade', ReunioesController.allPeriodicity);
router.post('/cadastraAta/:id', ReunioesController.cadastraAta);
router.get('/ataById/:id', ReunioesController.ataId);
router.put('/finalizaCompromisso/:id', ReunioesController.finalizarCompromisso);
router.delete('/deleteReuniao/:id', ReunioesController.deletaReuniao);

module.exports = router