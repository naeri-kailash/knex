# knex

Command-line todo app using knex

We're building a simple command-line tool to manage our list of todos. We're finally at the point of storing our data in a database! Woooo! We're using the knex module to talk to our SQLite3 database.

Setup

Install dependencies.

npm init -y
npm i knex sqlite3 --save
npm i tape tap-diff --save-dev
Create knex and test scripts in package.json.

"scripts": {
  "knex": "knex",
  "test": "tape test/**/*-test.js"
}
This prevents us from having to install knex globally.

Set file permissions.

Since this is a CLI (command-line interface) tool, instead of running our app using node todo list, we'd like to be able to run it like any other utility/script on our computer to make it easier to use. Run chmod +x todo in your terminal to add the excutable flag to the file. Now you can run it in your console using ./todo list

Create the knex config file (knexfile.js).

npm run knex init
Setup the database

Add a migration for the todos table.

npm run knex migrate:make todos
Edit the new file in the new migrations folder so it will add (and drop) a table called todos with the following fields:

id (auto incrementing)
task: string
The documentation for createTableIfNotExists and dropTableIfExists might be helpful.

Use npm run knex migrate:latest to apply the changes to the database.

Add some seed data.

npm run knex seed:make test-tasks
Edit the new file in the new seeds folder so it will add new tasks to the todos table.

The documentation for del and insert might be helpful.

Run npm run knex seed:run to add the new data to the database.

Display task ID

We want to be able to update and delete our tasks. But before we do that we need to be able to identify them.

Add some code so that when we log out a task it gives the id number too. eg

$ ./todo list

1: vaccuum
2: buy groceries
Delete a task by ID

Users should be able to complete tasks. We'd like to be able to do something like ./todo done 1 which will remove the task with id of 1 from the database.

You'll want to add a new function that returns a promise that can delete a row given its id. Look how the other functions work. You might need to review promises.

What is happening with those .catch and .finally bits of code? What happens when you remove the .finally calls?

Update a task by ID

Users make mistakes. Let them update a task like so:

./todo update 1 'clean my room thoroughly'
Add ability to search

Busy people are complaining about having 200 tasks in their consoles. Add a feature that searches in the task string for a given word. Perhaps something like:

./todo search 'wire'
Add migration to mark a task complete

Now we have users using our tool, but we have new features to add. We need a way of updating our database without destroying all the existing data.

Users want to be able to mark a task as complete without removing it from the database.

Use npm run knex migrate:make add-completed-column to create a new empty migration.

The documentation for knex.schema.table might be helpful when modifying an existing table.

What data type should we use to store our new field(s)?

Fill in the .down function in your migration. It should undo the changes made in the .up function.

Run npm run knex migrate:latest to run the new migration applying the changes to the database. If you don't get any errors, inspect the database in the SQLite Manager. Is it what you expected? What happened to existing data in the database?

Run knex migrate:rollback and look in your database.

Run knex migrate:latest and look again.

Finish the mark task complete feature

It's up to you to decide how far you want to go with this. Should listing all the tasks show completed and uncompleted tasks? Maybe you should add the task completed status when printing out a task. Maybe you can filter by completed when listing?

Add the feature that's missing

What is the next feature that would make this tool more useful for you? A priority field? Sorting? Tags? Archival? Whatever it is, add it!
