
import { useState } from 'react';
import PropTypes from "prop-types";


const useAnimationControl = (classNames) => {

    const [className, setClassName] = useState(classNames.enter);

    const waitAnimationEnd = (target, callback) => {
        setClassName(className + " " + classNames.exit);

        target.current.addEventListener("animationend", () => {
            callback();
        }, { once: true })
    }

    const setClass = (key) => {
        setClassName(classNames[key])
    }

    return [className, setClass, waitAnimationEnd]
}

useAnimationControl.propTypes = {
    styles: PropTypes.object.isRequired
}

export default useAnimationControl;