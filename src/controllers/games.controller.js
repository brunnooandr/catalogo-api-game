const game = require('../models/games.model')


const save = async (req, res, next) => {  
    try {
        const data = req.body
        const newgame = new game(data)
        const savedgame = await newgame.save()
        if(!savedgame) {
            throw new Error('game cold not be saved')
        }
        res.status(201).json({
            message: 'New game created'
        })
        
    } catch(err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const game = await game.find()
        res.status(200).json(game)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id
        const game = await Game.findById(id)
        if(!game) {
            throw new Error(`Game with id ${id} not found`)
        }
        res.status(200).json(game)
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const game = await Game.findById(id)
        if(!game) {
            throw new Error(`game with id ${id} not found`)
        }

        const newgame = await game.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newgame)
    } catch(err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const game = await game.findById(id)
        if(!game) {
            throw new Error(`game with id ${id} not found`)
        }
        await game.findByIdAndDelete(id)
        res.status(200).json({message: `game with id ${id} has deleted`})
    } catch(err) {
        next(err)
    }
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove
}

