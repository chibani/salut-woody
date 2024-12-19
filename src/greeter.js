export default class Greeter {
    generated_greetings = 'Salutation !';

    constructor(config) {
        this.config = config;
    }

    pick_adjective = (position=0, word='', gender='m') => {
        const adj = this.getCompatibleAdjectives(this.config.adjectives, word, gender).at(position);

        return this.adjectivize(word, adj, gender);
    }

    pick_random_adjective = (word, gender = 'm') => {
        return this.pick_adjective(Math.floor(Math.random() * this.getCompatibleAdjectives(this.config.adjectives, word, gender).length), word, gender);
    }

    pick_all_adjectives = (word, gender = 'm') => {
        return this.getCompatibleAdjectives(this.config.adjectives, word, gender).map( adj => this.adjectivize(word, adj, gender) );
    }

    adjectivize = (word, adj, gender) => {
        console.log(word, adj, gender);
        if (typeof adj === 'string') {
            return this.gender_swap(adj, gender).replace('%s', word);
        } else {
            return adj[word in adj?word:gender].replace('%s', word);
        }
    }

    getCompatibleAdjectives = (adjectives, word, gender) => { 
        return adjectives.filter( adj => this.isCompatible(adj, word, gender));
    }

    isCompatible = (adj, word, gender) => {
        if (typeof adj === 'string') {
            return true;
        } else {
            return word in adj || gender in adj;
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