function buildElement(element) {
    if (typeof element === 'undefined') {
        throw new Error('Type of element is undefined. Try again.');
    }
    const el = document.createElement(element);
    return {
        addAttribute(key, value) {
            el.setAttribute(key, value);
            return this;
        },
        addCustomAttribute(key, value) {
            const attr = document.createAttribute(key);
            attr.value = value;
            el.setAttributeNode(attr);
            return this;
        },
        addClass: function addClass(className) {
            el.className = className;
            return this;
        },
        addClasses(...classes) {
            el.classList.add(...classes);
            return this;
        },
        addClassesIf(...classes) {
            classes.forEach(({ condition, clazz }) => {
                if (!condition) {
                    return;
                }
                el.classList.add(clazz);
            });
            return this;
        },
        setText(text) {
            const newText = new Text(String(text));
            el.appendChild(newText);
            return this;
        },
        appendOn(target) {
            target.appendChild(el);
            return this;
        },
        append(element) {
            el.appendChild(element);
            return this;
        },
        on(eventName, callback) {
            el.addEventListener(eventName, callback);
            return this;
        },
        build() {
            return el;
        }
    };
}
export default buildElement;
