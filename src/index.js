import Greeter from './greeter.js';
import config from './dict/woody.js';

const greeter = new Greeter(config);

const update_greetings = () =>{
    greeter.refresh_greetings();
    document.getElementById("txt_greetings").innerText = greeter.get_generated_greetings();
}
document.getElementById("btn_refresh").addEventListener("click", update_greetings);
document.getElementById("btn_copy").addEventListener("click", greeter.copy_to_clipboard);
//Update the adjectives counter
document.getElementById("txt_adjectives_counter").innerText = config.adjectives.length;

// Pick a first one
update_greetings();