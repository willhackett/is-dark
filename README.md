# is-dark
Detect whether or not the system is in dark mode from the browser.

![Come to the dark side!](https://i.imgur.com/ShUTLqk.gif)

## Rationale

The choice of whether to enable a light or dark appearance is an aesthetic one for most users, and might not relate to ambient lighting conditions. Websites should support both appearances and react to changes at the system level.

## Installation

Install the package using `npm` or `yarn`

```bash
npm install -S is-dark
```

```bash
yarn add is-dark
```

## Usage

### Check Once

To check once, simply call the default export from `is-darkmode`.

```typescript
import isDarkMode from 'is-darkmode'

isDarkMode() // true | false
```

### Subscribe to System Changes

To subscribe to system UI changes, call the `onChange` method.

```typescript
import { subscribeToColorScheme } from 'is-darkmode'

let textColor = 'black'
let bgColor = 'white'

subscribeToColorScheme((scheme) => {
  switch(scheme) {
    case 'dark':
      textColor = 'white'
      bgColor = 'black'
      break;
    case 'light':
      textColor = 'black'
      bgColor = 'white'
      break;
  }
})
```
