import React, { useContext, useEffect, useState, memo } from 'react';
import { onSnapshot } from "firebase/firestore";

import { database, manifestContext } from '../../Context';
import SubjectRow from "./SubjectRow";


export default memo(function Marks() {

    const manifest = useContext(manifestContext);
    const [marks, setMarks] = useState(null);

    useEffect(() => {
        onSnapshot(database.marks, (snapshot) => {
            if (snapshot.data()) {
                setMarks(Object.fromEntries(Object.entries(snapshot.data()).sort()));
            }
        });
    }, []);

    const rows = [];

    if (marks) {
        for (let subjID in manifest) {
            const subject = manifest[subjID];
            subject.id = subjID;

            if (subject.marks) {
                rows.push(<SubjectRow key={subjID} subject={subject} marks={marks[subjID]}/>);
            }
        }
    }

    return (
        <div className="UIBlock">
            <h1>Оценки</h1>
            <div className="content">
                { rows }
            </div>
        </div>
    );
});