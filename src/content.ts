// @ts-ignore
import { faker } from 'faker-js';

import buildElement from 'element-builder';
import settings from 'settings';

const pagination = document.querySelector('[data-pagination="wrapper"]') as HTMLDivElement;
const content = document.querySelector('[data-pagination="content"]') as HTMLDivElement;

type Person = {
    id: number,
    name: string,
    lastname: string,
    email: string
};

function generateRandomPeople(length: number = settings.contentLength): Array<Person> {

    return Array.from(({ length: length }), () => ({
            id: faker.string.alphanumeric({ length: 5 }),
            name: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email()
    }));
}

generateRandomPeople().forEach((person: Person): void => {

    const personWrapper = buildElement('div')
        .addCustomAttribute('data-person', 'wrapper')
        .appendOn(content)
        .build();

    const personDescription = buildElement('div')
        .addCustomAttribute('data-person', 'description')
        .appendOn(personWrapper)
        .build();

    buildElement('p')
        .setText(''.concat(person.name, ' ', person.lastname))
        .appendOn(personDescription)
        .build();

    buildElement('small')
        .setText(person.id)
        .appendOn(personDescription)
        .build();
});

function updatePeople() {

    const startIndex = (settings.currPage - 1) * settings.maxPerPage;
    const endIndex = settings.currPage * settings.maxPerPage;

    const contentChildren = [...content.children];

    contentChildren.forEach((element: Element, index: number) => {
        const el = element as HTMLElement;
        el.style.setProperty('display', index >= startIndex && index < endIndex ? 'block' : 'none')
    });
}

pagination.addEventListener('pageupdated', () => {
    updatePeople();
    content.scrollIntoView({ block: 'start', behavior: 'smooth' })
});

// export default contents;