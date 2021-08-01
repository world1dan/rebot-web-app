import React, { useEffect, useState } from 'react';

import { onSnapshot } from "firebase/firestore";

export default function Notes(props) {
    return (
        <div className="UIBlock">
            <h1>Заметки</h1>
        </div>
    );
}