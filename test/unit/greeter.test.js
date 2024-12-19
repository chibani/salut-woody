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
        {'copeaux':'%s copelants', 'sciures':'%s sciees', 'm': '%s non-copelants', 'f':'%s non-copelantes'},
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
        'échardes non-copelantes',
        'échardes dernières',
    ]);
    expect(greeter.pick_all_adjectives('copeaux', 'm')).toStrictEqual([
        'copeaux magiques',
        'copeaux copelants',
        'copeaux derniers',
    ]);
});

test('Should generate the greeting properly', ()=>{
    greeter.config.adjectives = ['%s magiques'];
    greeter.refresh_greetings();
    expect(greeter.get_generated_greetings()).toBe('On test les copeaux magiques');
});

test('Should check adjective compatibility', ()=>{
    expect(greeter.isCompatible('%s compatibles', 'copeaux', 'm')).toBe(true);
    expect(greeter.isCompatible({'f':'%s incompatibles'})).toBe(false);
    expect(greeter.isCompatible({'sciures':'%s incompatibles'})).toBe(false);
    expect(greeter.isCompatible({'copeaux':'%s compatibles'})).toBe(false);
    expect(greeter.isCompatible({'m':'%s compatibles'})).toBe(false);
});

test('Should filter adjectives by compatibility', ()=>{
    const adjectives = [
        {'m':'%s compatibles'},
        {'f':'%s incompatibles'},
        {'sciures':'%s incompatibles'},
        {'copeaux':'%s compatibles'},
        {'m':'%s compatibles'}
    ]

    expect(greeter.getCompatibleAdjectives(adjectives, 'copeaux', 'm').length).toBe(3);
    expect(greeter.getCompatibleAdjectives(adjectives, 'sciures', 'f').length).toBe(2);
});