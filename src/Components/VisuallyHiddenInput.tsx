import { FC, forwardRef, InputHTMLAttributes } from 'react'
import { css } from '@linaria/core'

const styles = css`
    display: none;
    visibility: hidden;
`

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IVisuallyHiddenInputProps
    extends InputHTMLAttributes<HTMLInputElement> {}

const VisuallyHiddenInput: FC<IVisuallyHiddenInputProps> = forwardRef<
    HTMLInputElement,
    IVisuallyHiddenInputProps
>(({ ...restProps }, ref) => {
    return <input ref={ref} className={styles} {...restProps} />
})

VisuallyHiddenInput.displayName = 'VisuallyHiddenInput'

export default VisuallyHiddenInput
