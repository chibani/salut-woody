const Greeter = require("../src/greeter.js");

// Setup
const greeter = new Greeter({
    "generate_greetings": (pick_adjective) =>
    {
        return `On test les ${pick_adjective('copeaux')}`
    },

    "adjectives" : [
        'magiques',
    ]
});

test('Should gender correctly', ()=>{
    expect(greeter.gender_swap('magique')).toBe('magique');
    expect(greeter.gender_swap('joli_e_s', 'f')).toBe('jolies');
    expect(greeter.gender_swap('joli_e_s', 'm')).toBe('jolies');
});