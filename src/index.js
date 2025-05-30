import React from "react";

const FLASH_CLASS = "use-render-flash";
const FLASH_STYLE_ID = "__use-render-flash-style__";

/**
 * Injects required CSS animation styles into the document head
 * @private
 */
const injectFlashStyle = () => {
  if (document.getElementById(FLASH_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = FLASH_STYLE_ID;
  style.textContent = `
    @keyframes use-render-flash-fade {
      0% { background-color: var(--flash-color, transparent); }
      10% { background-color: var(--flash-color, transparent); }
      100% { background-color: transparent; }
    }
    .${FLASH_CLASS} {
      animation: use-render-flash-fade var(--flash-duration, 1s);
    }
  `;
  document.head.appendChild(style);
};

/**
 * React hook that creates a flash effect on component re-renders
 * @param {string} [color="hsl(150, 100%, 35%)"] - CSS color value for the flash effect
 * @param {string} [duration="1s"] - Duration of the flash animation (e.g. "1s", "500ms")
 * @returns {React.RefObject} Ref object to attach to the target element
 *
 * @example
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const flashRef = useRenderFlash("red", "1s");
 *
 *   return (
 *     <div ref={flashRef} style={{ padding: 16 }}>
 *       <button onClick={() => setCount((c) => c + 1)}>Increment</button>
 *       <div>Count: {count}</div>
 *     </div>
 *   );
 * }
 */
const useRenderFlash = (color = "hsl(150, 100%, 35%)", duration = "1s") => {
  const ref = React.useRef();

  React.useEffect(() => {
    injectFlashStyle();
    const node = ref.current;
    if (!node) return;

    if (typeof color !== "string" || typeof duration !== "string") {
      console.warn("useRenderFlash: color and duration must be strings");
      return;
    }

    node.style.setProperty("--flash-color", color);
    node.style.setProperty("--flash-duration", duration);
    void node.offsetWidth; // Force reflow
    node.classList.add(FLASH_CLASS);

    return () => {
      node.classList.remove(FLASH_CLASS);
      node.style.removeProperty("--flash-color");
      node.style.removeProperty("--flash-duration");
    };
  });

  return ref;
};

export default useRenderFlash;
