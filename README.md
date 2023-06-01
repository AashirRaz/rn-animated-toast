# rn-animated-toast

[![npm version](https://img.shields.io/npm/v/rn-animated-toast.svg)](https://www.npmjs.com/package/rn-animated-toast "View this project on npm")
[![License](https://img.shields.io/npm/l/rn-animated-toast.svg)](https://github.com/AashirRaz/rn-animated-toast/blob/main/LICENSE "View this project on npm")
[![npm total downloads](https://img.shields.io/npm/dt/rn-animated-toast.svg)](https://img.shields.io/npm/dt/rn-animated-toast.svg)
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-989898.svg?style=flat-square)](https://www.npmjs.com/package/rn-animated-toast "View this project on npm")

Toast it up! Elevate your React Native app with `<Toast />` - the perfect ingredient for serving up delightful and informative messages.

## Install

Open a Terminal in the project root and run:

Using npm:

```sh
npm install --save react-native-device-info
```

or using yarn:

```sh
yarn add react-native-device-info
```

## Features

- `Easy-to-use API:` Quickly integrate toast messages into your React Native app with a simple and intuitive API.
- `Customizable Appearance:` Customize the look and feel of your toasts by configuring properties such as background color, text color, duration, and more.
- `Multiple Toast Types:` Display different types of toasts, including success, error, warning, or general informative messages.
- `Built with TypeScript:` The entire codebase of the toast package is written in TypeScript, providing improved code maintainability, better developer tooling, and enhanced static type checking.
- `Positioning Options:` Choose the position where your toasts appear on the screen, such as top, bottom.
- `Duration Control:` Set the duration for how long the toast message stays visible before automatically dismissing.
- `Lightweight and Performant:` Designed to be lightweight and optimized for performance, ensuring smooth operation in your React Native app.

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

## Customization

### `Toast` props

There are lots of props to customize your toast or your can use renderToast to implement your own component.

```js
<Toast
    position="bottom | top"
    offset={50} // offset is same for top and bottom toasts
    visibilityTime={4000}
    successIcon={require("../../icons/succesIcon.png")}
    errorIcon={require("../../icons/errorIcon.png")}
    infoIcon={require("../../icons/infoIcon.png")}
    defaultIcon={require('../../icons/AppIcon.png')}
    successColor="green"
    errorColor="red"
    infoColor="yellow"
    defaultColor="black"
>
```

## Methods

### showToast()

```js
const onPress = () => {
    showToast(message: "Task finished successfully",
        type: "default" | "success" | "error" | "info",
        showDefaultIcon: false,
        iconPath: require("../../images/icon.png")
    );
}
```

## Props

| Prop            | Type               | Optional | Default | Description                                              |
| --------------- | ------------------ | -------- | ------- | -------------------------------------------------------- |
| message         | string             | No       |         | Message which is need to be displayed                    |
| type            | string             | Yes      | default | type of showing message                                  |
| showDefaultIcon | boolean            | Yes      | false   | To display the default icon , without showing type icons |
| iconPath        | ImageRequireSource | Yes      |         | Icon to display in the toast message                     |

### hideToast()

Call hideToast to hide all that toast that are invoked

```js
const onPress = () => {
  hideToast();
};
```

## Contributing

We welcome contributions from the community! Please refer to the [contribution guidelines](https://github.com/AashirRaz/rn-animated-toast/blob/main/CONTRIBUTING.md) for more details.

## License

This project is licensed under the [MIT License](https://github.com/AashirRaz/rn-animated-toast/blob/main/LICENSE).

##

If you find rn-animated-toast useful, consider giving it a star on [GitHub](https://github.com/AashirRaz/rn-animated-toast) and spread the word! 🌟

---
