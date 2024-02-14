# RVE Web Dashboard - website

The frontend part of our RVE Web Dashboard project.


## Configuration

Create a `.env` file in the root of the project with the following variable names:
- `PUBLIC_URL` - the URL where the website is hosted
- `REACT_APP_API_URL` - the URL of the backend API
- `NODE_ENV` - the environment in which the website is running (development/production)


## Installation for development

Will start the React development server (with hot-reload and debug tools) on a random port. NOT suitable for production.

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install dependencies: `npm install i`
3. Start the project: `npm start`

If you need to rebuild type checks, use `npm run build-checks`.


## Installation for production

Will build the project and start a basic HTTP server.

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install dependencies: `npm install ci`
3. Build the project: `npm run build`
4. Run the built project: `npm run serve`

The website will try to start on the 3000 port by default, but you can change it by appending the `--listen` option to the last command:
```bash
npm run serve -- --listen 8080
```