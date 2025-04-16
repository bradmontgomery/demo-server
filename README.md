# demo-server

A simple express-based backend server API (see [expressjs.com](https://expressjs.com/)). 

_This is the backend API powering the `Names` component in the [demo-project](https://github.com/bradmontgomery/demo-project) (2023) and [taradiddle](https://github.com/bradmontgomery/taradiddle/) (2024)._


## Quickstart

1. Clone this repo.
2. `cd` into the `demo-server` folder
3. Run `npm install`, then
4. Run `npm run dev`

# Project Setup

The following are the steps I took to create this project.

## How I created this project

_Updated for node v22.14.0_!

Let's create the project in which we'll build the API. You run the 
following commands in a terminal (I used a bash terminal [using WSL](https://learn.microsoft.com/en-us/windows/wsl/))

- `mkdir demo-server` to create a directory named `demo-server/`
- `cd demo-server` to change into that directory.
- `npm init` to set up a node-based project; follow the prompts.. below is what I used:
    - package name: I called mine "demo-server"
    - version: 1.0.0
    - description: a simple express-based api
    - entry point: index.js
    - test command: (leave this blank)                                                        
    - git repository: (leave this blank)                                                                 
    - keywords: (leave this blank)                                                                       
    - author: write your name!                                                                         
    - license: MIT 
    - Is this OK? yes
- Now, we need to install packages that we plan to use:
  - `npm install express` to install the Express.js framework.
  - `npm install nodemon` to install the `nodemon` library.
  - `npm install cors` to install the `cors` library (learn more at [MDN: Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS))
  - `npm install fs` to install the `fs` library to allow us to access the local filesystem.

Now, configure the project so that we're using `nodemon` to auto-reload our server whenever we make changes to the source code:

- Edit `package.json`, add `"dev": "nodemon index.js"` to the `scripts` section (see the sample scripts section below)
- Run `code index.js` to open a new file; This is where we'll add functions to emplmenet API endpoints.
- Run `npm run dev` to run a development server.

Sample `scripts` section from `package.js`:

```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js"
  },
```

### The "database"

For this project we'll just use a file to store our data. Copy the following into a `database.json` file into your project directory. 
It should be in the same folder as your `index.js` file.

```json
[{"id":1,"name":"Foo"},{"id":2,"name":"Bar"},{"id":3,"name":"Bingo"}]
```


## resources

This project makes use of a number of different tools.

- Express.js's hello world example: https://expressjs.com/en/starter/hello-world.html
- Simple web service example: https://github.com/expressjs/express/blob/master/examples/web-service/index.js
- Reading files with Node.js: https://nodejs.dev/en/learn/reading-files-with-nodejs/
- Writing files with Node.js: https://nodejs.dev/en/learn/writing-files-with-nodejs/
- httpie as a tool to interact with the API: https://httpie.io
    - You're welcome to use the desktop application: https://httpie.io/download
    - OR the command-line (cli) application:  https://httpie.io/cli