import { FC, useState, useRef, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import SheetView from '../../../Components/SheetView/index'
import { css } from '@linaria/core'

import DayCard, { DayCardProps } from './index'
import getNodeScreenshotFile from '../../../Utils/getNodeScreenshotFile'
import SegmentedControl from '../../../Components/Blocks/SegmentedControl/index'
import { ISubjectsManifest } from '../../../types'
import { manifestContext } from '../../../Context'

const styles = css`
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 10px;

    .share {
        height: 48px;
        border-radius: 7px;
        width: 100%;
        max-width: 400px;
        background: var(--indigo);
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        margin: 0 auto;
    }

    .sheet-title {
        font-size: 15px;
        text-align: center;
    }

    .share-text-preview {
        white-space: pre-wrap;
        background: var(--bg3);
        padding: 14px;
        border-radius: 9px;
        border: 1px solid var(--borders);
    }
`
export interface IShareMenuProps {
    handleClose: () => void
    dayCardProps: DayCardProps
}

const convertDayDataToText = (
    timetable: DayCardProps['timetable'],
    manifest: ISubjectsManifest
) => {
    let homework = ''

    for (const lessonNum of Object.keys(timetable).sort()) {
        const lessonData = timetable[lessonNum]

        if (!lessonData.groups) {
            const title = manifest[lessonData.id].title
            const hw = lessonData.hw

            if (!title || !hw) continue

            homework += `${title}:  ${hw}\n`
        } else {
            homework += '\n'
            for (let i = 1; i <= 3; i++) {
                const lesson = lessonData[i.toString()]

                if (!lesson || !lesson.hw) continue

                const title = manifest[lesson.id].title
                const hw = lesson.hw

                homework += `${title}:  ${hw} (Группа ${i})\n`
            }

            homework += '\n'
        }
    }
    return homework
}

const ShareMenu: FC<IShareMenuProps> = ({ handleClose, dayCardProps }) => {
    const [shareMode, setShareMode] = useState<'as-image' | 'as-text'>(
        'as-image'
    )
    const dayCardCanvasRef = useRef<HTMLDivElement>(null)

    const subjectsManifest = useContext(manifestContext)

    if (!subjectsManifest) return null

    const share = async () => {
        if (shareMode == 'as-image') {
            if (!dayCardCanvasRef.current) return

            const image = await getNodeScreenshotFile(
                dayCardCanvasRef.current,
                'Расписание.png'
            )

            if (navigator.share && image) {
                navigator.share({
                    title: 'Расписание',
                    files: [image],
                })
            }
        } else {
            const text = convertDayDataToText(
                dayCardProps.timetable,
                subjectsManifest
            )

            if (navigator.share && text) {
                navigator.share({
                    title: 'Расписание',
                    text: text,
                })
            }
        }
    }

    return (
        <SheetView handleClose={handleClose}>
            <div className={styles}>
                <h1 className="sheet-title">Поделиться</h1>
                <SegmentedControl
                    activeItem={shareMode}
                    onChange={setShareMode}
                    items={[
                        {
                            id: 'as-image',
                            title: 'Как изображение',
                        },
                        {
                            id: 'as-text',
                            title: 'Как текст',
                        },
                    ]}
                />
                <div className="share-content-preview" ref={dayCardCanvasRef}>
                    {shareMode == 'as-image' && (
                        <DayCard {...dayCardProps} shareMode />
                    )}
                    {shareMode == 'as-text' && (
                        <div className="share-text-preview">
                            {convertDayDataToText(
                                dayCardProps.timetable,
                                subjectsManifest
                            )}
                        </div>
                    )}
                </div>
                <motion.button
                    onClick={share}
                    className="share"
                    whileTap={{
                        scale: 0.95,
                    }}
                >
                    Поделиться
                </motion.button>
            </div>
        </SheetView>
    )
}

export interface IShareProps {
    dayCardProps: DayCardProps
}

const Share: FC<IShareProps> = ({ dayCardProps }) => {
    const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false)

    return (
        <>
            <button
                className="table-btn"
                style={{ fontSize: '16px' }}
                onClick={() => setShareMenuOpen(true)}
            >
                <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
            </button>
            {shareMenuOpen && (
                <ShareMenu
                    dayCardProps={dayCardProps}
                    handleClose={() => setShareMenuOpen(false)}
                />
            )}
        </>
    )
}

export default Share
