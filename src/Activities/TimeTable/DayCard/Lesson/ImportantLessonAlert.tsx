import { css } from '@linaria/core'
import { FC } from 'react'
import { ISubject } from '../../../../types'

const styles = css`
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: -6px;
    padding: 3px;
    padding-left: 10px;
    text-align: center;
    border-radius: 5px 5px 0 0;
`

export interface IImportantLessonAlertProps {
    subject: ISubject
}

const ImportantLessonAlert: FC<IImportantLessonAlertProps> = ({ subject }) => {
    return (
        <div
            className={styles}
            style={{
                background: subject?.color,
            }}
        >
            На этом уроке к/р или самостоялка
        </div>
    )
}

export default ImportantLessonAlert
