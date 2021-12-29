# example [React.js](https://github.com/hchiam/learning-reactjs) app using [`styled-components`](https://github.com/styled-components/styled-components)

If you want to start from scratch:

```sh
npx create-react-app react-app; cd react-app; npm install --save styled-components; npm install --save-dev babel-plugin-styled-components; npm run start;
```

If you want to use this demo:

```sh
cd react-app-using-styled-components; npm install; npm run start;
```

To make it easier to find components when inspecting in DevTools, use `babel-plugin-styled-components` and change `import styled from 'styled-components';` to `import styled from 'styled-components/macro'`.

You can get VSCode syntax highlighting and auto-complete for styled-components: https://styled-components.com/docs/tooling#syntax-highlighting

`styled-components` can also do SSR (like with Next.js): https://styled-components.com/docs/advanced#server-side-rendering

```json
{
  "babel": {
    "plugins": [["babel-plugin-styled-components"]],
    "presets": ["react-app"]
  }
}
```
