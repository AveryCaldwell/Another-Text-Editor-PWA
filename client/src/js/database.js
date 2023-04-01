import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', {
                keyPath: 'id',
                autoIncrement: true,
            });
            console.log('jate database created');
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    // console.error('putDb not implemented');
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
      const request = storeVar.put({ id: 1, value: content });
    //   FIXME- do I use "id" or "1"?
    // const request = store.put({ id: id, todo: content });
    const result = await request;
    //  FIX ME - result or result.value?
    //  console.log('🚀 - data saved to the database', result);
    console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET from the database');
    // Create a connection to the database database and version we want to use.
//     const jateDb = await openDB('jate', 1);
//     // Create a new transaction and specify the database and data privileges.
//     const tx = jateDb.transaction('jate', 'readonly');
//     // Open up the desired object store.
//     const store = tx.objectStore('jate');
//     // Use the .getAll() method to get all data in the database.
//     const request = store.getAll();
//     // Get confirmation of the request.
//     const result = await request;
//     console.log('result.value', result);
//     return result;
// };
  const jateDb = await openDB('jate', 'readonly');
  const store = trasnVar.objectStore('jate');
  const request = storeVar.get(1);
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
};

// console.error('getDb not implemented');

initdb();
