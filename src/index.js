import Greeter from './greeter.js';
import config from './dict/woody.js';
import {gsap, ScrollTrigger} from "gsap/all.js";
import css from "./assets/css/style.css";

const greeter = new Greeter(config);

const update_greetings = () =>{
    greeter.refresh_greetings();
    document.getElementById("txt_greetings").innerText = greeter.get_generated_greetings();
    gsap.fromTo(document.getElementById("txt_greetings"), {
            opacity: 0,
            y: -10
        }, {
            duration: 1,
            opacity: 1,
            y: 0,
        }
    );
}
document.getElementById("btn_refresh").addEventListener("click", update_greetings);
document.getElementById("btn_copy").addEventListener("click", greeter.copy_to_clipboard);
//Update the adjectives counter
document.getElementById("txt_adjectives_counter").innerText = config.adjectives.length;

gsap.from(document.getElementById("title_main"), {duration: 1, opacity: 0, x: -100, ease: "power4.out"});
gsap.from(document.getElementById("txt_welcome"), {duration: 1, opacity: 0, y: -10, ease: "power4.out", delay: 0.5});
gsap.from(document.getElementById("div_greetings"), {duration: 1, opacity: 0, y: -10, ease: "power4.out", delay: 1});
gsap.from(document.getElementById("txt_help"), {duration: 2, opacity: 0, y: 20, ease: "power4.out", delay: 1.5});

// Pick a first one
update_greetings();