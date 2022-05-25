import { CSSProperties, FC, forwardRef } from 'react'
import classNames from 'classnames'
import VisuallyHiddenInput from './VisuallyHiddenInput'
import { css } from '@linaria/core'

const styles = css`
    position: relative;
    display: block;
    cursor: pointer;

    &.disabled {
        cursor: not-allowed;
    }

    .pseudo {
        width: 51px;
        height: 31px;
        border: 2px solid transparent;
        background: var(--switch-background-color);
        border-radius: 15px;
        position: relative;
        display: block;
        transition: background-color 0.15s ease, border-color 0.2s ease;
    }

    .pseudo::before {
        transition: transform 0.15s ease;
        position: absolute;
        content: '';
        top: -3px;
        left: -3px;
        border-radius: 50%;
        top: 0;
        left: 0;
        width: 27px;
        height: 27px;
        background: var(--switch-indicator-background-color);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 3px 1px rgba(0, 0, 0, 0.06),
            inset 0 0 0 0.5px rgba(0, 0, 0, 0.04);
    }

    input:checked + .pseudo {
        background: var(--green);

        &::before {
            transform: translateX(20px);
        }
    }
`

export interface ISwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    style: CSSProperties
}

const Switch: FC<ISwitchProps> = forwardRef<HTMLInputElement, ISwitchProps>(
    ({ className, style, ...restProps }) => {
        return (
            <label
                style={style}
                role="presentation"
                className={classNames(styles, className, `Switch`, {
                    disabled: restProps.disabled,
                })}
            >
                <VisuallyHiddenInput type="checkbox" {...restProps} />

                <span role="presentation" className="pseudo" />
            </label>
        )
    }
)

Switch.displayName = 'Switch'

export default Switch
