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

const Link = ({ url }) => {
    return (
        <a className={styles} href={url}>
            {url}
        </a>
    )
}

export default Link
