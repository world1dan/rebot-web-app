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
import UserInfo from './UserInfo'

const styles = css`
    > div,
    .YearMarks {
        padding: 0 !important;
    }
`

const styles2 = css`
    border-radius: 13px 13px 0 0;
    overflow: hidden;
    position: relative;
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
                    <VerticalLayout>
                        <UserInfo user={userInfo} />

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
