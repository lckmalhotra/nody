const fs = require('fs');
const colors = require('colors');
const arg = require('yargs').check(function (argv) {
    if (!argv) {
        throw new Error("Arguments Invalid".red);
    }
    return true;
}).argv;

var bookRecords = JSON.parse(fs.readFileSync('json/records.json', {encoding: 'utf-8'}));

switch (arg.operation) {
    case "add":
        addBook(arg);
        break;
    case "remove":
        removeBook(arg);
        break;
    case "update":
        updateBook(arg);
        break;
    case "clear":
        clearAll();
        break;
    case "get":
        getRecord(arg);
        break;
}

function addBook(record) {

    for (let x = 0; x < bookRecords.length; x++) {
        if (bookRecords[x].name === record.name) {
            console.log(record.name + " name is already exists.".red);
            return;
        }
    }

    var newBook = {
        name: record.name,
        subject: record.subject,
        price: record.price
    };

    if (record) {
        bookRecords.push(newBook);
        fs.writeFileSync('json/records.json', JSON.stringify(bookRecords), {encoding: 'utf-8'});
    }
}

function removeBook(record) {
    for (let x = 0; x < bookRecords.length; x++) {
        if (bookRecords[x].name === record.name || bookRecords[x].subject === record.subject) {
            console.log(record.name + " removed!!".green);
            bookRecords.splice(x,1);
            fs.writeFileSync('json/records.json', JSON.stringify(bookRecords), {encoding: 'utf-8'});
        }
    }
}

function updateBook(record) {
    for (let x = 0; x < bookRecords.length; x++) {
        if (bookRecords[x].name == record.name) {
            var newBook = {
                name: record.name,
                subject: record.subject,
                price: record.price
            };

            if (record) {
                bookRecords.splice(x,1);
                bookRecords.push(newBook);
                fs.writeFileSync('json/records.json', JSON.stringify(bookRecords), {encoding: 'utf-8'});
                return;
            }
        }
    }
}

function clearAll() {
    bookRecords = [];
    fs.writeFileSync('json/records.json', JSON.stringify(bookRecords), {encoding: 'utf-8'});
}

function getRecord(record) {
    for (let x = 0; x < bookRecords.length; x++) {
        if (bookRecords[x].name == record.name) {
            console.log(bookRecords[x]);
        }
    }
}
