# rc-listener

> An event-listener wrapped in a react component

[![NPM](https://img.shields.io/npm/v/react-listener.svg)](https://www.npmjs.com/package/react-listener) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rc-listener
```

## Usage

```tsx
import React, { Component } from 'react'

import { Listener } from 'rc-listener'

function App() {
  return (
    <Listener
      event="message"
      identifier={event => event.details.id === 'heartBeat'}
    >
      {
        (event) =>
          <UserAgent event={event} />
      }
    </Listener>
  );
}

function UserAgent(props) {
  return (
    <div>
      {props.event ? (
        <div>Your ping: {props.event.details.ping}</div>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}
```

## License

MIT © [BnayaZil](https://github.com/BnayaZil)
