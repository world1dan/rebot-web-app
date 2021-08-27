import React, { useContext } from 'react'
import { manifestContext } from '../../Context';

export default function SolutionBox(props) {

    const manifest = useContext(manifestContext);

    const url = manifest[props.data.subject].url.replace("?", props.data.num);

    function changeNum(delta) {

        props.remove(props.data);
        props.add({
            subject: props.data.subject,
            num: props.data.num + delta
        });
    }


    return (
        <div id="viewbox" className="viewbox">
            <div className="viewbox-tools">
                <div className="center-section">
                    <button id="prew" onClick={() => changeNum(-1)}><i className="fas fa-chevron-left fa-lg"></i></button>
                    <span className="num">{props.data.num}</span>
                    <button id="next" onClick={() => changeNum(1)}><i className="fas fa-chevron-right fa-lg"></i></button>
                </div>
                <button className="close" onClick={props.removeSolution}><i className="fas fa-times fa-lg"></i></button>
            </div>
            <div className="viewbox-content">
                <img width="100%" src={"./static/img/demo.jpg"}/>
            </div>
        </div>
    )
}