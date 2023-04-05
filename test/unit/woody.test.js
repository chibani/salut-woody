import config from '../../src/dict/woody.js';

// test the config should use the default template any day but april first
test('Should use the apply the special template on April first', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-04-01'));
    expect(config.generate_greetings((word)=>word)).toBe('Salut les algues, les anguilles et les poissons');
});

test('Should use the default template any day but april first', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
    expect(config.generate_greetings((word)=>word)).toBe('Salut les copeaux, les échardes et les sciures');
});

test('Dictionary should not contain duplicates in adjectives', () => {
    const adjectives = config.adjectives;
    //expect(adjectives.length).toBe(  );
    let duplicated = adjectives.filter((element, index) => {
        return adjectives.indexOf(element) !== index;
    });

    expect(duplicated).toStrictEqual([]);
});