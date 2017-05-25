function IndexDb(){
  const db_name = "todoDB";
  const that = {};
  let idb = null;
  const init = () => {
    const promise = new Promise( (resolve, reject) => {
      const open = window.indexedDB.open(db_name, 1);
      open.onupgradeneeded = () => {
        idb = open.result;
        idb.createObjectStore( db_name, { keyPath: "date"});
      };
      open.onsuccess = () => {
        idb = open.result;
        resolve(true);
      };

      open.onerror = () => {
        idb = open.result;
        reject(true);
      };
    });
    return promise;
  };
  const addTask = (task) => {
    const promise = new Promise( ( resolve, reject) => {
      const tx = idb.transaction( db_name, "readwrite");
      const store = tx.objectStore( db_name);
      store.add(task)
      .onsuccess = (event) => {
        resolve( event.target.result);
      };
    });
    return promise;
  };
  const deleteTask = (by_date) => {
    const promise = new Promise( (resolve, reject) => {
      const tx = idb.transaction( db_name, "readwrite");
      const store = tx.objectStore( db_name);
      store.delete( by_date);
      tx.oncomplete = (e) => {
        resolve( e.target.result);
      };
    });
    return promise;
  };
  const getTasks = () => {
    const promise = new Promise( ( resolve, reject) => {
      const tx = idb.transaction( db_name, "readonly");
      const store = tx.objectStore( db_name);
      let todo_list = [];
      store.openCursor().onsuccess = (event) => {
        const cur = event.target.result;
        if(cur){
          todo_list.push( cur.value);
          cur.continue();
        } else {
          resolve( todo_list);
        }
      };
    });
    return promise;
  };
  const close = () => {
    idb.close();
  };
  that.init = init;
  that.close = close;
  that.getAllTasks = getTasks;
  that.addTask = addTask;
  that.deleteTask = deleteTask;
  return that;
}

export default IndexDb();