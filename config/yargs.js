const description = {
    demand: true,
    alias: 'd',
    desc: 'Todo description'
};
const completed = {
    default: false,
    alias: 'c',
    desc: 'If the todo is completed or not'
};

const argv =
    require('yargs')
    .command('list', 'Shows in console all the todos')
    .command('create', 'Creates a todo', {
        description
    })
    .command('edit', 'Edits a todo', {
        description,
        completed
    })
    .command('remove', 'Removes a todo', {
        description
    })
    .help()
    .argv;

module.exports = {
    argv
};