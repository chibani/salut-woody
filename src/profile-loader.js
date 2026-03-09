import astrology from '../data/dictionaries/astrology.json';
import common from '../data/dictionaries/common.json';
import computers from '../data/dictionaries/computers.json';
import culture from '../data/dictionaries/culture.json';
import food from '../data/dictionaries/food.json';
import medecine from '../data/dictionaries/medecine.json';
import music from '../data/dictionaries/music.json';
import protsky from '../data/dictionaries/protsky.json';
import regionalisme from '../data/dictionaries/regionalisme.json';
import sciences from '../data/dictionaries/sciences.json';
import tinkering from '../data/dictionaries/tinkering.json';
import woodworking from '../data/dictionaries/woodworking.json';
import woodySciures from '../data/dictionaries/woody-sciures.json';
import woody from '../data/dictionaries/woody.json';

const DICTIONARIES = { common, sciences, culture, woodworking, food, astrology, computers, medecine, music, protsky,regionalisme, tinkering, 'woody-sciures': woodySciures, woody };

function matchesCondition(condition) {
    const now = new Date();
    if (condition.type === 'date') {
        return now.getMonth() + 1 === condition.month && now.getDate() === condition.day;
    }
    if (condition.type === 'date_range') {
        return (!condition.year || now.getFullYear() === condition.year)
            && now.getMonth() + 1 === condition.month
            && condition.days.includes(now.getDate());
    }
    return false;
}

function selectTemplate(templates) {
    for (const template of templates) {
        if (template.condition !== null && matchesCondition(template.condition)) {
            return template;
        }
    }
    return templates.find(t => t.condition === null);
}

function buildGenerateGreetings(templates) {
    return (pick_adjective) => {
        const template = selectTemplate(templates);
        const filled = template.slots.map(slot => pick_adjective(slot.word, slot.gender));
        return template.pattern.replace(/\{(\d+)\}/g, (_, i) => filled[Number(i)]);
    };
}

export function loadProfile(profile) {
    return {
        adjectives: profile.dictionaries.flatMap(id => DICTIONARIES[id]),
        generate_greetings: buildGenerateGreetings(profile.templates),
    };
}
