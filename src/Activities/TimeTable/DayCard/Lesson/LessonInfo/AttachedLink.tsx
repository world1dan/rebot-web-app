import { css } from '@linaria/core'

const styles = css`
    background: var(--bg3);
    border-radius: 9px;
    padding: 14px;
    color: var(--green);

    overflow-x: auto;
    text-decoration: underline;
    -webkit-user-drag: auto;
    -webkit-touch-callout: auto;
`

export interface IAttachedPhotoProps {
    URL: string
}
const AttachedLink = ({ URL }: IAttachedPhotoProps) => {
    return (
        <a className={styles} href={URL}>
            {URL}
        </a>
    )
}

export default AttachedLink
