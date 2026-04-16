import Greeter from './greeter.js';
import { loadProfile } from './profile-loader.js';
import woodyProfile from '../data/profiles/woody.json';
import titavionProfile from '../data/profiles/titavion.json';
import {gsap} from "gsap/all.js";
import "./assets/css/style.css";

const PROFILES = {
    woody: woodyProfile,
    titavion: titavionProfile,
};

let greeter = null;

function initProfile(profileId) {
    const profile = PROFILES[profileId];
    if (!profile) return;

    const config = loadProfile(profile);
    greeter = new Greeter(config);
    
    document.getElementById("txt_adjectives_counter").innerText = config.adjectives.length;
    update_greetings();
}

function update_greetings() {
    if (!greeter) return;
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

// Populate profile selector
const select = document.getElementById("profile_select");
for (const [id, profile] of Object.entries(PROFILES)) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = profile.name || id;
    select.appendChild(option);
}

const urlParams = new URLSearchParams(window.location.search);
const defaultProfile = urlParams.get("profile") || "woody";
if (PROFILES[defaultProfile]) {
    select.value = defaultProfile;
    initProfile(defaultProfile);
}

// Handle profile change
select.addEventListener("change", (e) => {
    const profileId = e.target.value;
    if (profileId && PROFILES[profileId]) {
        initProfile(profileId);
    }
});

document.getElementById("btn_refresh").addEventListener("click", update_greetings);
document.getElementById("btn_copy").addEventListener("click", () => greeter?.copy_to_clipboard());

gsap.from(document.getElementById("title_main"), {duration: 1, opacity: 0, x: -100, ease: "power4.out"});
gsap.from(document.getElementById("div_profile_selector"), {duration: 1, opacity: 0, y: -10, ease: "power4.out", delay: 0.3});
gsap.from(document.getElementById("txt_welcome"), {duration: 1, opacity: 0, y: -10, ease: "power4.out", delay: 0.5});
gsap.from(document.getElementById("div_greetings"), {duration: 1, opacity: 0, y: -10, ease: "power4.out", delay: 1});
gsap.from(document.getElementById("txt_help"), {duration: 2, opacity: 0, y: 20, ease: "power4.out", delay: 1.5});