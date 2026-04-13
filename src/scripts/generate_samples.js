import Greeter from '../greeter.js';
import config from '../dict/woody.js';

const N = parseInt(process.argv[2] ?? 500);
const greeter = new Greeter(config);

console.log = () => {};

for (let i = 0; i < N; i++) {
    greeter.refresh_greetings();
    process.stdout.write(`${greeter.get_generated_greetings()}\n`);
}
