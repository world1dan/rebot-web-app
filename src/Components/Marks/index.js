import React, { useContext, memo } from 'react';

import { database, manifestContext } from '../../Context';
import SubjectRow from "./SubjectRow";

import useFirestoreListener from '../../Hooks/useFirestoreListener';


export default memo(function Marks() {

    const manifest = useContext(manifestContext);
    let marks = useFirestoreListener(database.marks);
    
    if (marks) {
        marks = Object.fromEntries(Object.entries(marks).sort());
    }

    const rows = [];

    for (let subjID in manifest) {
        const subject = manifest[subjID];
        subject.id = subjID;

        if (subject.marks) {
            rows.push(<SubjectRow key={subjID} subject={subject} marks={marks && marks[subjID] ? marks[subjID] : ""}/>);
        }
    }

    return (
        <div className="UIBlock">
            <h1>Оценки</h1>
            <div className="content">
                { rows }
            </div>
            <div className="info" style={{marginTop: 10}}>Нужно разделять запятой, справа - средний балл</div>
        </div>
    );
});