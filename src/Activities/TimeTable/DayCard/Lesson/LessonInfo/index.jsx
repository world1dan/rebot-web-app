import { useContext, useState } from 'react'

import { css } from '@linaria/core'

import { manifestContext, MarksContext } from '../../../../../Context'

import VerticalLayout from '../../../../../Components/Layouts/VerticalLayout'
import SubjectMarks from '../../../../Marks/QuarterMarks/SubjectMarks'
import SheetView from '../../../../../Components/SheetView'
import InputModal from '../../../../../Components/InputModal'
import SubjectName from './SubjectName'
import Tools from './Tools'
import AttachedPhoto from './AttachedPhoto'
import Link from './AttachedLink'
import LastChange from './LastChange'

const styles = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px;

    background-color: var(--bg3);
    border-radius: 9px;
    box-shadow: 0 0 0 1px var(--lvl4-borders) inset;
    position: relative;

    .marks-list {
        --bg2: var(--bg3);
        margin: -4px;

        .main-content {
            padding: 0;
            padding-right: 40px;
        }
        .SubjectMarks {
            min-height: 78px;
        }
    }

    .homework-view {
        font-weight: 500;
        font-size: 18px;
        -webkit-user-select: all;
        user-select: all;
        word-break: break-word;
    }

    .link-wraper {
        position: absolute;
        right: 6px;
        top: 6px;
    }

    .no-hw {
        color: var(--text2);
    }
`

const InfoBlock = ({ children }) => {
    return <div className={styles}>{children}</div>
}

const dstyles = css`
    font-size: 14px;
    padding-left: 14px;
    margin-bottom: -3px;
    color: var(--text2);
`

const Title = ({ children }) => {
    return <div className={dstyles}>{children}</div>
}

const LessonInfo = ({ lesson, path, subject, handleClose }) => {
    const manifest = useContext(manifestContext)
    const [isEditing, setIsEditing] = useState(false)

    const isMath = lesson.id == 'alg' || lesson.id == 'geom'

    const marksAll = useContext(MarksContext)
    const marks = marksAll?.[isMath ? 'math' : lesson.id] ?? []
    const markTarget = marksAll?.['marksTargets']?.[lesson.id]

    return (
        <SheetView handleClose={handleClose}>
            <VerticalLayout>
                <SubjectName subject={subject} />
                <Title>Домашнее задание</Title>
                <InfoBlock>
                    <div className="homework-view" onClick={() => setIsEditing(true)}>
                        {lesson.hw && lesson.hw !== '' ? (
                            lesson.hw
                        ) : (
                            <span className="no-hw">Нажми чтобы записать..</span>
                        )}
                    </div>
                    <LastChange lesson={lesson} />
                    {lesson.hw && <Tools homework={lesson.hw} />}
                </InfoBlock>
                {lesson.link && (
                    <>
                        <Title>Ссылка</Title>
                        <Link URL={lesson.link} />
                    </>
                )}
                {lesson.attachments && lesson.attachments.length > 0 && (
                    <>
                        <Title>Фото</Title>
                        <AttachedPhoto
                            URL={lesson.attachments[0]}
                            lesson={lesson}
                            path={path}
                        />
                    </>
                )}
                {(subject.marks || isMath) && (
                    <>
                        <Title>Мои оценки</Title>
                        <InfoBlock>
                            <div className="marks-list">
                                <SubjectMarks
                                    marks={marks}
                                    subject={isMath ? manifest['math'] : subject}
                                    embedded
                                    target={markTarget}
                                />
                            </div>
                        </InfoBlock>
                    </>
                )}
                {isEditing && (
                    <InputModal
                        handleClose={() => setIsEditing(false)}
                        path={path}
                        lesson={lesson}
                    />
                )}
            </VerticalLayout>
        </SheetView>
    )
}

export default LessonInfo
