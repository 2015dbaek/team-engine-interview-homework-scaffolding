# Team Engine Interview Homework Scaffolding

## Getting Started

This project is fairly straightforward, but if you encounter any problems with it, please let us know. This homework assignment is supposed to be more about writing code than it is about project scaffolding.

### Step 1: Install required dependencies

You'll need, in general, four things:

1. Node.js - <https://nodejs.org/en/download/>
2. Yarn - <https://classic.yarnpkg.com/en/docs/install>
3. Docker - <https://www.docker.com/get-started>

Once you have all of these tools installed, run a quick check on the command line to make sure they're working:

```bash
# Just check the versions of these tools
npm -v
node -v
yarn -v

# Docker can be a bit tricker. Run the following command to make sure it's up
docker ps

# If you got an empty table (CONTAINER ID, IMAGE, COMMAND, etc) you are good to go
# If you get some kind of error message, make sure that the docker daemon is running

```

### Step 2: Get the server running

The two things you need to do here are:

1. Run `yarn install` in the server directory
2. Run `docker compose up` in the root directory

That should create a new docker container with the server code running on port 9043. The first time you run `docker compose up` it will build the docker container from the `dockerfile`, but subsequent stops and starts will not need to do this.

After running `docker-compose up`, you should get the server output logs trailed in your console. Stopping the server works the same way as it would if you were running it outside of docker - just send the `Ctrl-c` command to stop.

Two other useful commands are:

1. `docker ps` which will show you what is currently running. This can be run from any place on your filesystem, and
2. `docker-compose down` which will remove the container and force a rebuild. This needs to be run from this folder

### Step 3: Get the client running

The two things you need to do here are:

1. Run `yarn install` in the client directory
2. Run `yarn start`

It should open up your browser to `http://localhost:3000/`, and if everything ran correctly, you should see our landing page.

## Client Project Walk Through

This client was created with `create-react-app`. It is set up with `typescript`, and has `Material-UI` set up for use. This mirrors our main product pretty closely, which is why we included both.

To learn more, here are some quick links to these projects:

1. React - <https://reactjs.org/docs/getting-started.html>
2. Typescript - <https://www.typescriptlang.org/docs/>
3. Material UI - <https://material-ui.com/getting-started/usage/>

The only requirement is that you use React. If you'd prefer to add a regular `javascript` file instead of `typescript`, or if there is a different UI framework you'd prefer to use, that is fine. We included these only as a convenience, and also  as a way to let you know what stack we're usually working with.

Similarly, feel free to add any other packages you think will be helpful.

## Server Project Walk Through

The server similarly mirrors our main product. Unlike the front end, it doesn't utilize `typescript`. Here's a rundown of the main packages that we use to deliver this app:

- babel - <https://babeljs.io/docs/en/> - allows us to write ES6 `javascript` code (import/export, classes, etc) by converting into a backwards-compatible version that is semantically equivalent
- nodemon - <https://www.npmjs.com/package/nodemon> - used to monitor file changes on the file system and restart the server when they change.
- express - <https://www.npmjs.com/package/express> - used as a web framework, and handles all of the low-level details of handling web requests.

Again - feel free to add or remove packages as you see fit.

### Data management

There is a data layer - it's in the `data-access-controller.js` file. For this project, you only ever need to deal with data that is held in memory (specifically: don't worry about trying to use a database here). The `DataAccessController` has four static properties - `employees`, `employeeGroups`, `groups`, and `messages`. All four are arrays of data, loaded out of the `.json` files that you'll find in the `src/data` folder.

There's an example of it's usage in the `employee-controller.js` file. It looks like this:

```javascript
let employees = DataAccessController.employees.getAll();
```

There is also an `add` function which simply push a new value onto the in-memory array. The only requirement is that you use the data in those `.json` files, so feel free to change how the `DataAccessController` works.

Please note that the provided test data is not meant to be comprehensive in terms of fields that are present, or their format.

## Submission

Feel free to use this git repo as you please. To submit it, just zip up your code and email it back to the team. (Preferrably by removing the `node_modules` folders first as to cut down on size)
