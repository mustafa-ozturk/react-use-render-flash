# react-use-render-flash

A tiny React hook to visually highlight a component when it re-renders.

## Demo

![demo](https://github.com/user-attachments/assets/5e809791-4199-4fca-ada0-23ccc530274a)

## Install

```bash
npm install react-use-render-flash
```

## Usage

```jsx
import React, { useState } from "react";
import useRenderFlash from "react-use-render-flash";

function Counter() {
  const [count, setCount] = useState(0);
  const flashRef = useRenderFlash(); // Optional: useRenderFlash(color, duration)

  return (
    <div ref={flashRef} style={{ padding: 16 }}>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <div>Count: {count}</div>
    </div>
  );
}
```

## API

```js
const ref = useRenderFlash(color, duration);
```
- `color` (optional): CSS color for the flash (default: `"hsl(150, 100%, 35%)"`).
- `duration` (optional): Animation duration (default: `"1s"`).

Attach the returned `ref` to any element you want to flash on render or re-render.

## License

MIT
