// You can get client object for native use
const { putValue, getValue, getAll, client } = require("etcd3-json");

(async ()=>{
    const person = {
        name: "john",
        surname: "snow",
        age: 4
    }
    const people = [ person ]

    // Put keys
    await putValue("foo", "bar");
    // You can put object stringified
    await putValue("person", person);
    await putValue("people", people);

    // Get keys
    const fooValue = await getValue("foo");
    const personValue = await getValue("person");
    const peopleValue = await getValue("people");
    // Get all
    const all = await getAll();

    console.log({fooValue, personValue, peopleValue});

    // You can use client object from Etcd3 to use natively
    await client.delete().all();
    const allAfterDel = await client.getAll();
    console.log({allAfterDel});

})()