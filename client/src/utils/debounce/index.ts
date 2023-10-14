const debounce = (fn, timeout) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, timeout)
    }
}

export default debounce;