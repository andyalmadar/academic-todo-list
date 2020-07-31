const fs = require('fs');
const colors = require('colors');

let toDos = [];

const saveToDB = () => {
    const data = JSON.stringify(toDos);

    fs.writeFile('db/data.json', data, err => {
        if (err) {
            throw new Error('Could not save the JSON', err)
        } else {
            console.log(`The main JSON file has been saved successfully`.green);
        }
    });
};

const loadDataFromDB = onlyShowCompleted => {
    try {
        toDos = require('../db/data.json').filter(toDo => onlyShowCompleted ? toDo.completed : true);
    } catch (err) {
        toDos = [];
    }
};

const getList = onlyShowCompleted => {
    loadDataFromDB(onlyShowCompleted);

    return toDos;
};

const create = description => {
    loadDataFromDB();

    const toDo = {
        description,
        completed: false
    };

    toDos.push(toDo);
    saveToDB();

    return toDo;
};

const edit = (description, completed = false) => {
    loadDataFromDB();

    const toDoToBeEditedIndex = toDos.findIndex(toDo => toDo.description === description);

    if (toDoToBeEditedIndex >= 0) {
        toDos[toDoToBeEditedIndex].completed = completed === 'true';
        saveToDB();
        return toDos[toDoToBeEditedIndex];
    }

    return false;
};

const remove = description => {
    loadDataFromDB();

    newToDos = toDos.filter(toDo => toDo.description !== description);
    saveToDB();

    return newToDos.length === toDos.length ? 'nothing has been deleted' : newToDos;
};

module.exports = {
    getList,
    create,
    edit,
    remove
};