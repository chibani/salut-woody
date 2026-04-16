import { loadProfile } from '../../src/profile-loader.js';
import woodyProfile from '../../data/profiles/woody.json';
import titavionProfile from '../../data/profiles/titavion.json';

const profiles = [woodyProfile, titavionProfile];

describe('Woody profile', () => {
    const config = loadProfile(woodyProfile);

    test('Should use the special template on April first', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-04-01'));
        expect(config.generate_greetings((word) => word)).toBe('Salut les algues, les anguilles et les poissons');
    });

    test('Should use the default template any day but april first', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
        expect(config.generate_greetings((word) => word)).toBe('Salut les copeaux, les échardes et les sciures');
    });

    test('Should use the special template on 2025 birthday stream', () => {
        jest.useFakeTimers().setSystemTime(new Date('2025-03-15'));
        expect(config.generate_greetings((word) => word)).toBe('Joyeux copeauversaire les copeaux, les échardes et les sciures');
    });
});

describe('All profiles', () => {
    test.each(profiles)('Dictionary should not contain duplicates in adjectives for profile $id', (profile) => {
        const config = loadProfile(profile);
        const adjectives = config.adjectives;
        const duplicated = adjectives.filter((element, index) => {
            return adjectives.indexOf(element) !== index;
        });
        expect(duplicated).toStrictEqual([]);
    });
});
