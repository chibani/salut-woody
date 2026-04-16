export default class Greeter {
    generated_greetings = 'Salutation !';

    constructor(config) {
        this.config = config;
    }

    pick_adjective = (position=0, word='', gender='m') => {
        const compatibles = this.getCompatibleAdjectives(this.config.adjectives, word, gender);
        if (compatibles.length === 0) {
            return ` ${word}`;
        }
        const adj = compatibles.at(position);
        if (!adj) {
            return ` ${word}`;
        }
        return this.adjectivize(word, adj, gender);
    }

    pick_random_adjective = (word, gender = 'm') => {
        const compatibles = this.getCompatibleAdjectives(this.config.adjectives, word, gender);
        if (compatibles.length === 0) {
            return ` ${word}`;
        }
        const position = Math.floor(Math.random() * compatibles.length);
        return this.pick_adjective(position, word, gender);
    }

    pick_all_adjectives = (word, gender = 'm') => {
        return this.getCompatibleAdjectives(this.config.adjectives, word, gender).map( adj => this.adjectivize(word, adj, gender) );
    }

    adjectivize = (word, adj, gender) => {
        if (!adj) {
            return ` ${word}`;
        }
        if (typeof adj === 'string') {
            return this.gender_swap(adj, gender).replace('%s', word);
        } else {
            const keys = Object.keys(adj);
            const key = keys.includes(word) ? word : gender;
            return adj[key].replace('%s', word);
        }
    }

    getCompatibleAdjectives = (adjectives, word, gender) => { 
        return adjectives.filter( adj => this.isCompatible(adj, word, gender));
    }

    isCompatible = (adj, word, gender) => {
        if (!adj) {
            return false;
        }
        if (typeof adj === 'string') {
            return true;
        } else {
            const keys = Object.keys(adj);
            const hasWordKey = keys.includes(word);
            const hasGenderKey = keys.includes(gender);
            return hasWordKey || hasGenderKey;
        }
    }

    
    gender_swap = (adj, gender) => {
        if (gender == 'f') {
            return adj.replaceAll('_', '');
        } else {
            return adj.replaceAll(/_[^_]+_/g, '');
        }
    };

    refresh_greetings = function () {
        this.generated_greetings = this.config.generate_greetings(this.pick_random_adjective);
    };

    copy_to_clipboard = () => {
        navigator.clipboard.writeText(this.generated_greetings);
    }

    get_generated_greetings = () => {
        return this.generated_greetings;
    }
}