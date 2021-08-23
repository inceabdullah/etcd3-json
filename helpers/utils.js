require("json-circular-stringify");

exports.isObject = (val) => val instanceof Object;

const isJsonParsable = exports.isJsonParsable = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
