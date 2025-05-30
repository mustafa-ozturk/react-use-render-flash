"use strict";const o=require("react"),t="use-render-flash",a="__use-render-flash-style__",l=()=>{if(document.getElementById(a))return;const r=document.createElement("style");r.id=a,r.textContent=`
    @keyframes use-render-flash-fade {
      0% { background-color: var(--flash-color, transparent); }
      10% { background-color: var(--flash-color, transparent); }
      100% { background-color: transparent; }
    }
    .${t} {
      animation: use-render-flash-fade var(--flash-duration, 1s);
    }
  `,document.head.appendChild(r)},c=(r="hsl(150, 100%, 35%)",s="1s")=>{const n=o.useRef();return o.useEffect(()=>{l();const e=n.current;if(e){if(typeof r!="string"||typeof s!="string"){console.warn("useRenderFlash: color and duration must be strings");return}return e.style.setProperty("--flash-color",r),e.style.setProperty("--flash-duration",s),e.offsetWidth,e.classList.add(t),()=>{e.classList.remove(t),e.style.removeProperty("--flash-color"),e.style.removeProperty("--flash-duration")}}}),n};module.exports=c;
