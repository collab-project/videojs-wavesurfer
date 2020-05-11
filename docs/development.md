# Development

Install dependencies using npm:

```
npm install
```

Build development and minified versions of the library and stylesheets:

```
npm run build
```

Generated files are placed in the `dist` directory.

During development:

```
npm run start
```

This will watch the source directory and rebuild when any changes
are detected. It will also serve the files on http://127.0.0.1:8080.

Generate the API documentation (placed in the `docs` directory):

```
npm run docs
```

All commands for development are listed in the `package.json` file and
are run using:

```
npm run <command>
```
