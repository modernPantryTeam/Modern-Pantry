class logger {
    log(data) {
        console.log(data);
    }

    warn(data) {
        console.warn(data);
    }

    error(data) {
        console.error(data);
    }
}

export default new logger();