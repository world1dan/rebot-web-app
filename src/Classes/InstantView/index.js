import "swiped-events";
import "./style.scss"


export default class InstantView {

    constructor(manifest) {
        this.manifest = manifest;

        this.window1 = document.querySelector("#inst1");
        this.window2 = document.querySelector("#inst2");

        this.window1.addEventListener('swiped-left', e => {
            this.close(e.target.closest(".instant-view"));
        });

        this.window2.addEventListener('swiped-right', e => {
            this.close(e.target.closest(".instant-view"));
        });

        this.window1.addEventListener('swiped-right', e => {
            this.switch(e.target.closest(".instant-view"));
        });

        this.window2.addEventListener('swiped-left', e => {
            this.switch(e.target.closest(".instant-view"));
        });
    }


    open(toOpen, content) {
        let win;

        if (this.window1.classList.contains("active")) {
            win = this.window2;
            document.querySelectorAll(".app").forEach((el) => {
                el.classList.add("noscroll");
            });
            window.instRight = true;
            window.instLeft = true;
        } else {
            if (window.orientation == 90 || window.screen.width >= 800) {
                document.querySelector("body").classList.add("min-right");
            } else {
                document.querySelectorAll(".app").forEach((el) => {
                    el.classList.add("noscroll");
                });
            }
            win = this.window1;
            window.instLeft = true;
            if (this.window2.classList.contains("active")) {
                window.instRight = true;
            }
        }

        if (content) {
            win.querySelector(".content").innerHTML = content;
            win.classList.add("active");
            return;
        } else {
            win.querySelector(".content").innerHTML = "";
        }

        const viewbox = win.querySelector(".content");

        for (let el of toOpen) {
            const subj = this.manifest[el.id];
            const nums = el.hw.split(",");


            for (let num of nums) {
                num = num.replace(/\D/g, "");

                if (!subj.section) {
                    let img1 = document.createElement("img");
                    img1.src = subj.url.replace('?', num);
                    img1.onerror = (ev) => { ev.target.remove(); };
                    img1.style.width = "100%";

                    viewbox.append(img1);

                    if (!subj.full_img) {
                        let img2, img3 = viewbox.querySelector("img").cloneNode(true);

                        img2.src = subj.url.replace('?', num + "_2");
                        img3.src = subj.url.replace('?', num + "_3");

                        viewbox.append(img2, img3);
                    }
                } else {
                    let i = 1;
                    let img;

                    while (i < 11) {
                        img = document.createElement("img");
                        img.src = subj.url.replace('*', num).replace('?', i);
                        img.style.width = "100%";
                        img.onerror = (ev) => { ev.target.remove(); };

                        viewbox.append(img);
                        i++;
                    }
                }
            }

        }

        win.classList.add("active");
    }

    switch (win) {
        if (window.instLeft && window.instRight || (window.orientation == 0 && window.screen.width <= 800)) { return; }

        let content = win.querySelector(".content").innerHTML;

        this.open(null, content);
    
        this.close(win);
    }

    close(win) {
        win.classList.remove("active");
        win.addEventListener("transitionend", () => {
            if (!(win.classList.contains("active"))) {
                let content = win.querySelector(".content");
                content.innerHTML = "";
                content.scrollTop = 0;
            }
        }, { once: true });

        if (win.getAttribute("side") == "left") {
            window.instLeft = false;
        } else {
            window.instRight = false;
        }

        let ActiveLeft = window.instLeft;
        let ActiveRight = window.instRight;
        let body = document.body.classList;

        if (!(ActiveLeft || ActiveRight)) {
            body.remove("min-left", "min-right");
        } else if (ActiveRight && !(ActiveLeft)) {
            body.remove("min-right");
            body.add("min-left");
        } else {
            body.remove("min-left");
            body.add("min-right");
        }

        document.querySelectorAll(".app").forEach((el) => {
            el.classList.remove("noscroll");
        });
    }
}

