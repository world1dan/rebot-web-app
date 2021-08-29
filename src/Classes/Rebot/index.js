
export default class ReBotManager {

    constructor(manifest) {
        this.manifest = manifest;
        this.box_container = document.querySelector('#boxes');
        this.viewbox_template = document.querySelector('.template #viewbox');
        this.status_title = document.querySelector('#current-subj');
        this.search = document.querySelector('.search input');


        document.querySelectorAll("#rebot header button").forEach((el) => {
            el.onclick = () => { window.UI.getInput((id, nums) => { this.open(id, nums); }, el.id); };
        });


        this.search.addEventListener("keydown", event => {
            if (event.key == "Enter") {
                window.open("https://www.google.com/search?q=" + this.search.value, '_blank');
                this.search.value = "";
                this.search.blur();
            }
        });
    }


    open(id, num) { 
        let nums;

        if (num == undefined) {
            nums = prompt('Введи номер или номера через запятую:');
            if (nums) {
                nums = nums.split(',');
            } else return;

        } else {
            nums = num;
        }

        const subj = this.manifest[id];

        this.status_title.textContent = subj.title;

        for (let num of nums) {
            if (!num) {
                continue;
            }
            if (this.box_container.querySelector(`.viewbox[num='${num}']`)) continue;

            let box = this.viewbox_template.cloneNode(true);

            if (!subj.section) {

                box.querySelector("#view").src = subj.url.replace('?', num);

                if (!subj.full_img) {
                    box.querySelector("#view2").src = subj.url.replace('?', num + "_2");
                    box.querySelector("#view3").src = subj.url.replace('?', num + "_3");
                }

            } else {
                box.querySelector("#prew").remove();
                box.querySelector("#next").remove();
                box.querySelector("#alt-re").remove();

                box.querySelector("#view").src = subj.url.replace('*', num).replace('?', 1);

                let i = 2;
                let img;

                while (i < 12) {
                    img = box.querySelector("#view").cloneNode(true);
                    img.onerror = function a() { this.remove(); };
                    img.src = subj.url.replace('*', num).replace('?', i);
                    box.querySelector(".viewbox-content").append(img);
                    i++;
                }
            }

            this.box_container.prepend(box);
            box.querySelector(".num").textContent = num;
            box.setAttribute("num", num);
            box.setAttribute("subj_id", id);
        }


    }

    change_num(btn, delta) {
        const box = btn.parentNode.parentNode;
        let subj = this.manifest[box.getAttribute("subj_id")];
        let num = parseInt(box.getAttribute('num')) + delta;

        box.querySelector("#view").src = subj.url.replace('?', num);

        if (subj.full_img == false) {
            const view2 = box.querySelector("#view2");
            const view3 = box.querySelector("#view3");
            
            view2.style.display = "";
            view3.style.display = "";

            view2.src = subj.url.replace('?', num + "_2");
            view3.src = subj.url.replace('?', num + "_3");


        }

        box.setAttribute('num', num);
        box.querySelector(".num").textContent = num;
    }

    remove(box) {
        box.remove();
    }

    open_alt(box) {
        let num = box.getAttribute('num');
        let url = this.manifest[box.getAttribute('subj_id')].alt_url.replace("?", num);

        if (url == '') {
            alert('Для этого предмета нет другого решебника');
            return;
        }

        window.open(url, '_self');
    }

}

