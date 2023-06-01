# rn-animated-toast

Toast component for React Native, supports Android, IOS and Web

## Install

Open a Terminal in the project root and run:

```sh
yarn add rn-animated-toast
```

## Features

- Fully Customizable
- Swipe to close support
- Smooth animation
- Fully typed with TypeScript

## Usage

Call Toast Component in your index.ts file.

```js
import Toast from 'rn-animated-toast'

export default function App() {
  return (
    <>
    <RestOfYourApp />
    <Toast>
    <>
  );
}
```

## Methods

### showToast()

```js
const onPress = () => {
showToast(message: "Task finished successfully",
  type: "default" | "success" | "error" | "info",
  showDefaultIcon: true | false,
  iconPath: require("../../images/icon.png")
);
}
```
