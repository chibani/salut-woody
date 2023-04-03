import Greeter from "../../src/greeter.js";

// console.log(Greeter);//FIXME

// Setup
const greeter = new Greeter({
    "generate_greetings": (pick_adjective) =>
    {
        return `On test les ${pick_adjective('copeaux')}`
    },

    "adjectives" : [
        '%s magiques',
        {'m': '%s derniers', 'f': '%s dernières'},
    ]
});

test('Should pick the last adjective', ()=>{
    expect(greeter.pick_adjective(-1)).toBe(' derniers');
});

test('Should gender correctly', ()=>{
    expect(greeter.gender_swap('magiques')).toBe('magiques');
    expect(greeter.gender_swap('magiques', 'f')).toBe('magiques');
    expect(greeter.gender_swap('magiques', 'm')).toBe('magiques');
    expect(greeter.gender_swap('joli_e_s', 'f')).toBe('jolies');
    expect(greeter.gender_swap('joli_e_s', 'm')).toBe('jolis');
    expect(greeter.gender_swap('libéré_e_s délivré_e_s', 'f')).toBe('libérées délivrées');
    expect(greeter.gender_swap('libéré_e_s délivré_e_s', 'm')).toBe('libérés délivrés');
});

test('Should adjectivize correctly', ()=>{
    expect(greeter.adjectivize('choses','%s vrai_e_s', 'f')).toBe('choses vraies');
    expect(greeter.adjectivize('trucs', '%s vrai_e_s', 'm')).toBe('trucs vrais');
    expect(greeter.adjectivize('choses',{'m':'%s ligneux', 'f': '%s ligneuses'}, 'f')).toBe('choses ligneuses');
    expect(greeter.adjectivize('trucs', {'m':'%s ligneux', 'f': '%s ligneuses'}, 'm')).toBe('trucs ligneux');
});

test('Should adjectivize with all adjectives', ()=>{
    expect(greeter.pick_all_adjectives('échardes', 'f')).toStrictEqual([
        'échardes magiques',
        'échardes dernières'
    ]);
});

test('Should generate the greeting properly', ()=>{
    greeter.config.adjectives = ['%s magiques'];
    greeter.refresh_greetings();
    expect(greeter.get_generated_greetings()).toBe('On test les copeaux magiques');
});