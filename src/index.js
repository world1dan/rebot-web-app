import React from 'react';
import ReactDOM from 'react-dom';

import DisableEdgeScroll from './DisableEdgeScroll';
import UI from './Classes/UI';





import App from './App';




const isSafari = /iPad|iPhone/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
globalThis.ios = isSafari;


ReactDOM.render(<App/>, document.getElementById('root'));


globalThis.UI = UI;



setTimeout(() => {
    const loading = document.querySelector(".loading");

    loading.classList.add("unactive");

    loading.addEventListener("transitionend", () => {
        loading.remove();
    });

}, isSafari ? 200 : 100);


if (isSafari) DisableEdgeScroll(document.getElementById("root"));