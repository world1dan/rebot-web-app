import { useContext } from 'react'
import { css } from '@linaria/core'
import { manifestContext } from '../../Context'

const styles = css`
    border-radius: 14px;
`

const Prank = () => {
    const manifest = useContext(manifestContext)

    const url = manifest?.['yakutov'].url

    if (!url) return null

    return <img className={styles} src={url} width="100%"></img>
}

export default Prank
