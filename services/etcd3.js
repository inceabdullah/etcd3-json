const utils = require("../helpers/utils")
const { Etcd3 } = require('etcd3');
const client = exports.client = new Etcd3();

exports.putValue = async (key, value) => {
    if (utils.isObject(value)) value = JSON.stringify(value);

    return await client.put(key).value(value);
};

exports.getValue = async (key) => {
    let value = await client.get(key);
    if (utils.isJsonParsable(value)) value = JSON.parse(value);

    return value;
}

exports.delKey = async (key) => await client.delete().key(key);

exports.getAll = async () => {
    const values = await client.getAll();
    Object.keys(values).forEach(key=>{
        if (utils.isJsonParsable(values[key])) values[key] = JSON.parse(values[key]);
    })

    return values;
}
