export default class Greeter {
    generated_greetings = '';

    constructor(config) {
        this.config = config;
    }

    pick_adjective = (word, gender = 'm') => {
        const adj = this.config.adjectives[Math.floor(Math.random() * this.config.adjectives.length)];

        if (typeof adj === 'string') {
            return this.gender_swap(adj, gender).replace('%s', word);
        } else {
            return adj[gender].replace('%s', word);
        }
    }

     gender_swap = (adj, gender) => {
        if (gender == 'f') {
            return adj.replaceAll('_', '');
        } else {
            return adj.replace(/_[^_]+_/, '');
        }
    };

    refresh_greetings = function () {
        this.generated_greetings = this.config.generate_greetings(this.pick_adjective);
    };

    copy_to_clipboard = () => {
        navigator.clipboard.writeText(this.generated_greetings);
    }

    get_generated_greetings = () => {
        return this.generated_greetings;
    }
}