const chalk = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return "Your notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const remainingNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (remainingNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const remainingNotes = notes.filter(function (note) {
        return note.title !== title
    })

    if (remainingNotes.length > 0) {
        if (notes.length === remainingNotes.length) {
            console.log(chalk.bgRed('No note found!'))
        } else {
            saveNotes(remainingNotes)
            console.log(chalk.bgGreen('Note removed!'))
        }
    } else {
        console.log('No notes removed!')
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}