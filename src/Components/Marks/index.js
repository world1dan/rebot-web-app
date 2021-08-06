import React, { useEffect, useState } from 'react';
import { onSnapshot } from "firebase/firestore";
import SubjectRow from "./SubjectRow"
import { database } from '../../Context';


export default function Marks() {

    const [marks, setMarks] = useState({});

    useEffect(() => {
        onSnapshot(database.marks, (snapshot) => {
            setMarks(Object.fromEntries(Object.entries(snapshot.data()).sort()));
        })
    }, []);


        let subj;
        let rows = [];

        for (subj in marks) {
            rows.push(<SubjectRow key={subj} subj_id={subj} marks={marks[subj]}/>);
        }

        return (
            <div className="UIBlock">
                <h1>Оценки</h1>
                <div className="content">
                    { rows }
                </div>
            </div>
        )
}