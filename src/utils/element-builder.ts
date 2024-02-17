interface ElementBuilder<T extends keyof HTMLElementTagNameMap = any> {
    addAttribute<K extends keyof HTMLElementTagNameMap[T] | string>(
        key: K,
        value: string
    ): ElementBuilder<T>;
    addCustomAttribute(key: string, value: string): ElementBuilder<T>;
    addClass(className: string): ElementBuilder<T>;
    addClasses(...classes: Array<string>): ElementBuilder<T>;
    addClassesIf(...classes: Array<{ clazz: string, condition: boolean }>): ElementBuilder<T>;
    setText(text: string | number): ElementBuilder<T>;
    appendOn(target: HTMLElement): ElementBuilder<T>;
    append(element: HTMLElement): ElementBuilder<T>;
    on(eventName: keyof HTMLElementEventMap, callback: () => void): ElementBuilder<T>;
    build(): HTMLElementTagNameMap[T];
}

function buildElement<T extends keyof HTMLElementTagNameMap>(element: T): ElementBuilder<T> | never {

    if(typeof element === 'undefined') {
        throw new Error('Type of element is undefined. Try again.')
    }

    const el = document.createElement(element);

    return {

        addAttribute<K extends keyof HTMLElementTagNameMap[T] | string>(key: K, value: string): ElementBuilder<T> {
            el.setAttribute(key as string, value)
            return this;
        },

        addCustomAttribute(key: string, value: string): ElementBuilder<T> {

            const attr = document.createAttribute(key);
            attr.value = value;
            el.setAttributeNode(attr);

            return this;
        },

        addClass: function addClass(className: string): ElementBuilder<T> {
            el.className = className;
            return this;

        },

        addClasses(...classes): ElementBuilder<T> {
            el.classList.add(...classes);
            return this;
        },

        addClassesIf(...classes: Array<{ clazz: string, condition: boolean }>): ElementBuilder<T> {

            classes.forEach(({ condition, clazz }) => {

                if(!condition) {
                    return;
                }

                el.classList.add(clazz);

            })

            return this;
        },

        setText(text: string | number): ElementBuilder<T> {

            const newText = new Text(String(text));
            el.appendChild(newText);

            return this;
        },

        appendOn(target: HTMLElement): ElementBuilder<T> {

            target.appendChild(el);

            return this;

        },

        append(element: HTMLElement): ElementBuilder<T> {

            el.appendChild(element);

            return this;
        },

        on(eventName: string, callback: () => void): ElementBuilder<T> {

            el.addEventListener(eventName, callback);

            return this;
        },

        build(): HTMLElementTagNameMap[T] {
            return el;
        }
    }
}

export default buildElement