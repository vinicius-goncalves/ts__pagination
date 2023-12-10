import buildElement from 'element-builder';

const buttonsIcon = {
    previous: 'chevron_left',
    next: 'chevron_right'
};

type ButtonType = keyof typeof buttonsIcon;

function createIcon(name: string) {

    const icon = buildElement('span')
        .addClass('material-symbols-outlined')
        .setText(name)
        .build();

    return icon;
}

function createButton(type: ButtonType) {

    const icon = createIcon(buttonsIcon[type as ButtonType]);

    const button = buildElement('button')
        .addAttribute('type', 'button')
        .addClasses('navigation-button', type)
        .append(icon)
        .build();

    return button
}

export default createButton