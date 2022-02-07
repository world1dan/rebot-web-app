import { useState } from 'react'
import { css } from '@linaria/core'

import Wraper from '../../Components/Wraper'
import QuarterMarks from './QuarterMarks'
import YearMarks from './YearMarks'
import Rating from './Rating'
import SegmentedControl from '../../Components/Blocks/SegmentedControl'

const wraperStyles = css`
    margin: 0 auto;
    max-width: 1200px;
`

const headerStyles = css`
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    max-width: 740px;
    padding: 30px 12px;

    @media (max-width: 650px) {
        gap: 12px;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        padding: 10px 12px;
    }

    @media (max-width: 380px) {
        padding: 8px;
    }

    .title {
        font-size: 34px;
        font-weight: bold;
        margin: 0;
        padding-left: 14px;

        @media (max-width: 600px) {
            font-size: 26px;
        }
    }

    @media (min-width: 750px) {
        .title {
            padding-left: 90px;
        }

        padding: 26px 0;
    }

    @media (max-width: 340px) {
        padding: 8px 0;
    }
`

const Marks = () => {
    const [currentTab, setCurrentTab] = useState('quarter')

    return (
        <Wraper className={wraperStyles}>
            <header className={headerStyles}>
                <h1 className="title">Оценки</h1>
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
                            id: 'rating',
                            title: 'Рейтинг',
                        },
                    ]}
                />
            </header>

            {currentTab == 'quarter' && <QuarterMarks />}
            {currentTab == 'year' && <YearMarks />}
            {currentTab == 'rating' && <Rating />}
        </Wraper>
    )
}

export default Marks
