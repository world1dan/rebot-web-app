import React, { forwardRef } from "react";

import "./style.css";


export default forwardRef( function Backdrop({ children, active, onClick }, ref) {


    return (
        <>
        {children}
        <div
			ref={ref}
			onClick={onClick}
			className={active ? "backdrop" : ""}
        />
        </>
    );
});

