import buildElement from 'element-builder';
const buttonsIcon = {
    previous: 'chevron_left',
    next: 'chevron_right'
};
function createIcon(name) {
    const icon = buildElement('span')
        .addClass('material-symbols-outlined')
        .setText(name)
        .build();
    return icon;
}
function createButton(type) {
    const icon = createIcon(buttonsIcon[type]);
    const button = buildElement('button')
        .addAttribute('type', 'button')
        .addClasses('navigation-button', type)
        .append(icon)
        .build();
    return button;
}
export default createButton;
