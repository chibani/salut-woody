import Greeter from "../src/greeter.js";

// console.log(Greeter);//FIXME

// Setup
const greeter = new Greeter({
    "generate_greetings": (pick_adjective) =>
    {
        return `On test les ${pick_adjective('copeaux')}`
    },

    "adjectives" : [
        '%s magiques',
    ]
});

test('Should gender correctly', ()=>{
    expect(greeter.gender_swap('magique')).toBe('magique');
    expect(greeter.gender_swap('joli_e_s', 'f')).toBe('jolies');
    expect(greeter.gender_swap('joli_e_s', 'm')).toBe('jolis');
});

test('Should generate the greeting properly', ()=>{
    greeter.refresh_greetings();
    expect(greeter.get_generated_greetings()).toBe('On test les copeaux magiques');
});