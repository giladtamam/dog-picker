# Dogs App

The application contains the main component App with the children:
PreviewImage - to display the uploaded image, you can find 2 images in images folder for example.
once image uploaded onLoaded ill trigger the classify module and get the predictions, extract the dog breed if it's exist,
call fetch with breed random images to fit the screen size,
Gallery - display all the breed images using infinite scroll by sending async request to fetch next items

## Available scripts

To start the project, simply run:

```bash
npm run start
```

To run the linter, execute the command:

```bash
npm run lint
```

optionally, you can append `:fix` to automatically fix any auto-fixable linting
issues.

To test you application, use:

```bash
npm run test
```
