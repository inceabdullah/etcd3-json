# etcd3-json

Etcd supports string values. You can keep json or array objects in etcd server with being stringified and can get them parsed.

This lib exports client object from Etcd3 class to use that framework natively also.

in [test.js file](test.js) can be seen an example

```JavaScript
// You can get client object for native use
const { putValue, getValue, getAll, client } = require("./services/etcd3");

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
/*   expected result
    {
        fooValue: 'bar',
        personValue: { name: 'john', surname: 'snow', age: 4 },
        peopleValue: [ { name: 'john', surname: 'snow', age: 4 } ]
    }
 */

    // You can use client object from Etcd3 to use natively
    await client.delete().all();
    const allAfterDel = await client.getAll();
    console.log({allAfterDel});
/*  expected result
    { allAfterDel: {} }

 */
})()
```
