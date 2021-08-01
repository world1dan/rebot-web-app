import React, { PureComponent } from 'react';
import { onSnapshot } from "firebase/firestore";
import SubjectRow from "./SubjectRow"


export default class Marks extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            marks: false
        }
    }

    componentDidMount() {
        onSnapshot(this.props.marksRef, (snapshot) => {
            this.setState({
                marks: Object.fromEntries(Object.entries(snapshot.data()).sort())
            })
        })

    }


    render() {
        if (this.state.marks) {

            let subj;
            let rows = [];

            for (subj in this.state.marks) {
                rows.push(<SubjectRow key={subj} subj_id={subj} path={this.props.marksRef} manifest={this.props.manifest} marks={this.state.marks[subj]}/>);
            }
    
            return (
                <div className="UIBlock">
                    <h1>Оценки</h1>
                    <div className="content">
                        { rows }
                    </div>
                </div>
            )

        } else {
            return ""
        }
    }
}