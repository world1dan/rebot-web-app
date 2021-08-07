import React, { useEffect, useState } from 'react';

import { onSnapshot } from "firebase/firestore";

export default function Now(props) {
    return (
        <div className="UIBlock">
            <h1>Сейчас</h1>
        </div>
    );
}