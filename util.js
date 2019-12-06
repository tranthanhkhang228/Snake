export { convert };

// A regex gets all number using for converting
const template = /\d/g;

// Converting an array of string into a number
const convert = (value) => {
    return value.match(template).reduce((sum, item) => sum = sum * 10 + Number(item), 0);
};
