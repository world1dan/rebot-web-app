import { css } from '@linaria/core'
import { FC } from 'react'
import { ISubject } from '../../../../types'

const styles = css`
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    font-size: 13px;
    font-weight: bold;
`

export interface ISubjectNameProps {
    subject: ISubject
}

const SubjectName: FC<ISubjectNameProps> = ({ subject }) => {
    return (
        <div
            className={styles}
            style={{
                background: subject?.color,
            }}
        >
            {subject.title}
        </div>
    )
}

export default SubjectName
