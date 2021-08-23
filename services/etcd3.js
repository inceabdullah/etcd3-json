const utils = require("../helpers/utils")
const { Etcd3 } = require('etcd3');
const client = exports.client = new Etcd3();

exports.putValue = (key, value) => {
    if (utils.isObject(value)) value = JSON.stringify(value);

    return client.put(key).value(value);
};

exports.getValue = async (key) => {
    let value = await (await client.get(key)).toString();
    if (utils.isJsonParsable(value)) value = JSON.parse(value);

    return value;
}

exports.getAll = async () => {
    const values = await client.getAll();
    Object.keys(values).forEach(key=>{
        if (utils.isJsonParsable(values[key])) values[key] = JSON.parse(values[key]);
    })

    return values;
}