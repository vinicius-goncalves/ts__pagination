async function clearTree(...targets: Element[]): Promise<boolean> {

    if(typeof targets === 'undefined') {
        return false;
    }

    const clearedAll = targets.every(target => {

        while(target.firstChild !== null) {
            target.removeChild(target.firstChild);
        }

        return true;
    })

    return clearedAll
}

export { clearTree }