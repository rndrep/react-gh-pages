const getImages = () => {
    let arr = [];
    let arr2 = [];
    let all = [];

    for (let i = 0; i <= 35; i++) {
        arr.unshift(require(`./${i}.jpg`).default);
        arr2.unshift(require(`./${i}.jpg`).default);
    }

    all = [...arr, ...arr2];

    return all;
};

export default getImages();
