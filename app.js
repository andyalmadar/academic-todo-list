const colors = require('colors');
const { argv } = require('./config/yargs');

const { getList, create, edit, remove } = require('./todos/todos');

const command = argv._[0];
switch (command) {
    case 'list':
        console.log('List of todos:'.underline);
        const toDos = getList(argv.completed);
        for (let toDo of toDos) {
            console.log(`${toDo.completed ? '' : 'NOT '}COMPLETED - ${toDo.description}` [toDo.completed ? 'green' : 'red']);
        }
        break;
    case 'create':
        console.log('Creating todo...'.underline);
        const created = create(argv.description);
        console.log(`Created task:`, created);
        break;
    case 'edit':
        console.log('Updating todo...'.udnderline);
        const edited = edit(argv.description, argv.completed);
        console.log(`Updated task:`, !edited ? 'none' : edited);
        break;
    case 'remove':
        console.log('Deleting todo...'.underline);
        const removed = remove(argv.description, argv.completed);
        console.log(`The task list now is:`, !removed ? 'none' : removed);
        break;
    default:
        console.log('That command does not exist'.underline);
        break;
};