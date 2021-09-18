import { useState, useEffect } from 'react'


export default function useLocalStorageObj(key, defaultObj) {

    const [object, setObject] = useState(defaultObj)


    useEffect(() => {
        const json = localStorage.getItem(key);
        const objFromStorage = JSON.parse(json);

        setObject(objFromStorage || defaultObj);
    }, []);


    function set(obj) {
        const jsonString = JSON.stringify(obj);

        localStorage.setItem(key, jsonString);

        setObject(obj)
    }
    console.log(1)
    return [object, set];
  }