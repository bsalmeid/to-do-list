
const express = require('express');
//const checklist = require('../models/checklist');
const router = express.Router();
const Checklist = require('../models/checklist');


router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        //res.status(200).send(checklists);
        res.status(200).render('checklists/index', { checklists: checklists })
    } catch (error) {
        res.status(200).render('pages/error', { error: 'Erro ao Exibir as Listas' });
    }
})

router.get('/new', async (req, res) => {
    let { name } = req.body;
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { errors: 'Erro ao Carregar o Formulário' });
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id)
        console.log(checklist);
        res.status(200).render('checklists/edit', { checklist: checklist })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao Exibir Edição de Listas' });
    }
})

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id)
        // res.status(200).send(checklist);
        res.status(200).render('checklists/show', { checklist: checklist })
    } catch (error) {
        // res.status(500).json(error);
        res.status(500).render('pages/error', { error: 'Erro ao Exibir as Listas' });
    }
})

router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({ name });

    try {
        await checklist.save();
        //let checklist = await Checklist.create({name});
        res.redirect('/checklists');
        //res.status(200).send(checklist);
    } catch (error) {
        res.status(422).render('checklists/new', { checklist: { ...checklist, error } });
        //res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.update({ name });
        res.redirect('/checklists');
    } catch (error) {
        let errors = error.errors
        res.status(422).render('checklists/new', { checklist: { ...checklist, errors } });
    }
});


router.delete('/:id', async (req, res) => {
    console.log('ETSET DELETE')
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id);
        res.redirect('/checklists')
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao Deletar Lista' });
    }

});


module.exports = router;