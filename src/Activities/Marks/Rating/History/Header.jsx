import { css } from '@linaria/core'
import { useContext } from 'react'
import { manifestContext } from '../../../../Context'

const styles = css`
    padding: 8px;
`

const sortingStyles = css`
    padding: 8px;
    background: var(--bg3);
    border-radius: 7px;
    font-size: 13px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    align-items: center;
    font-weight: 600;
    .select {
        border: 0;
        font-weight: 600;
        background: var(--bg3);
        outline: none;
        font-size: 13px;
        color: var(--text1);
    }
`

const Header = ({ setSortingType }) => {
    const subjects = useContext(manifestContext)

    return (
        <div className={styles}>
            <div className={sortingStyles}>
                Сортировать по:
                <select
                    name="select"
                    className="select"
                    defaultValue={'date-recent'}
                    onChange={(event) => {
                        setSortingType(event.target.value)
                    }}
                >
                    <option value="date-recent">Дате (сначала новые)</option>
                    <option value="date-old">Дате (сначала старые)</option>
                    <option value="mark">Оценке</option>
                    <option value="user">Имени</option>
                    <optgroup label="По предметам">
                        {Object.values(subjects)
                            .filter((subject) => subject.marks)
                            .map((subject) => (
                                <option value={subject.id} key={subject.id}>
                                    {subject.title}
                                </option>
                            ))}
                    </optgroup>
                </select>
            </div>
        </div>
    )
}

export default Header
