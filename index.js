const contactsOperation = require("./contacts");

async function listContactTest() {
  const getContacts = await contactsOperation.listContacts();
  console.log(getContacts);
}

async function getContactByIdTest(id) {
  const NewContacts = await contactsOperation.getContactById(id);
  console.log(NewContacts);
}

async function removeContactTest(id) {
  const NewContacts = await contactsOperation.removeContact(id);
  console.log(NewContacts);
}

async function addContactTest(...args) {
  const NewContacts = await contactsOperation.addContact(...args);
  console.log(NewContacts);
}

// listContactTest();

// getContactByIdTest("8");

// removeContactTest("2");

// addContactTest("ivan", "ivan@mail.com", "377-345");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// console.log(argv);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.log(newContact);

      break;

    case "remove":
      const removeContact = await contactsOperation.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
