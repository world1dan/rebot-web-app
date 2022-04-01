import SheetView from '../../../../../Components/SheetView'
import VerticalLayout from '../../../../../Components/Layouts/VerticalLayout'
import SegmentedControl from '../../../../../Components/Blocks/SegmentedControl'
import MarksView from '../../../QuarterMarks/MarksView'
import YearMarks from '../../../YearMarks'
import H1 from '../../../../../Components/Typography/H1'
import { useMemo, useState } from 'react'
import { doc } from 'firebase/firestore'
import { firestore } from '../../../../../Context'
import History from '../../History'
import { css } from '@linaria/core'

const styles = css`
    > div,
    .YearMarks {
        padding: 0 !important;
    }
`

const styles2 = css`
    padding-top: 60px;

    .avatar {
        z-index: -1;
        position: absolute;
        pointer-events: all;
        left: 0;
        right: 0;
        top: 0;
        height: 500px;

        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: bottom !important;

        border-radius: 13px 13px 0 0;
    }
`

const UserMarks = ({ handleClose, userInfo, user, readOnly }) => {
    const [currentTab, setCurrentTab] = useState('quarter')

    const yearMarksDoc = useMemo(() => {
        return doc(
            firestore,
            'users',
            userInfo.id.toString(),
            'userStorage',
            'marks_year'
        )
    }, [])

    const usersInfo = {}
    usersInfo[userInfo.id] = userInfo

    const usersRatings = [user]
    return (
        <>
            <SheetView
                handleClose={handleClose}
                type={{ fullHeightOnMobile: true, wide: true }}
                background="var(--bg1)"
            >
                <div className={styles2}>
                    <div
                        style={{
                            background: `linear-gradient(to bottom, var(--marks-user-avatars-gradient), var(--bg1)), url(${userInfo.photo_url})`,
                        }}
                        className="avatar"
                    />
                    <VerticalLayout>
                        <H1 text={userInfo?.first_name} />
                        <SegmentedControl
                            onChange={setCurrentTab}
                            activeItem={currentTab}
                            items={[
                                {
                                    id: 'quarter',
                                    title: 'Четверть',
                                },
                                {
                                    id: 'year',
                                    title: 'Год',
                                },
                                {
                                    id: 'history',
                                    title: 'История',
                                },
                            ]}
                        />
                        <div className={styles}>
                            {currentTab == 'quarter' && (
                                <MarksView marks={user.marks ?? {}} readOnly={readOnly} />
                            )}
                            {currentTab == 'year' && (
                                <YearMarks
                                    yearMarksDoc={yearMarksDoc}
                                    readOnly={readOnly}
                                />
                            )}
                            {currentTab == 'history' && (
                                <History
                                    usersRatings={usersRatings}
                                    usersInfo={usersInfo}
                                />
                            )}
                        </div>
                    </VerticalLayout>
                </div>
            </SheetView>
        </>
    )
}

export default UserMarks
