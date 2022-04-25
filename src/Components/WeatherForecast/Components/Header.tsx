import { css } from '@linaria/core'
import { FC } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { City } from '../types'

const styles = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2px;

    .title {
        font-size: 16px;
        font-weight: 600;
    }

    .location {
        display: flex;
        gap: 5px;
        align-items: center;
        color: var(--text2);
        font-size: 13px;
        text-decoration: underline;
        cursor: pointer;
    }
`

export interface IHeaderProps {
    city: City
}

const Header: FC<IHeaderProps> = ({ city }) => {
    return (
        <div className={styles}>
            <div className="title">Погода</div>
            <div className="location">
                {city.name}
                <FontAwesomeIcon icon={faLocationArrow} />
            </div>
        </div>
    )
}

export default Header
