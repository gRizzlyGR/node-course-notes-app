const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title !== title)

    if (duplicateNotes.length > 0) {
        if (notes.length === duplicateNotes.length) {
            console.log(chalk.red.inverse('No note found!'))
        } else {
            saveNotes(duplicateNotes)
            console.log(chalk.green.inverse('Note removed!'))
        }
    } else {
        console.log('No notes removed!')
    }
}

const listNotes = () => {
    console.log(chalk.cyan("Your notes:"))

    loadNotes().forEach(note => {
        console.log(note.title)
    });    
}

const readNote = (title) => {
    const notes = loadNotes()
    foundNote = notes.find((note) => note.title === title)
    
    if (foundNote) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}