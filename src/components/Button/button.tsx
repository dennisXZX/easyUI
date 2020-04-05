import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Danger = 'danger',
    Default = 'default',
    Link = 'link',
    Primary = 'primary'
}

interface BaseButtonProps {
    children: React.ReactNode;
    btnType?: ButtonType;
    className?: string;
    disabled?: boolean;
    href?: string;
    size?: ButtonSize;
}

const Button: React.FC<BaseButtonProps> = props => {
    const {
        btnType,
        children,
        className,
        disabled,
        href,
        size
    } = props;

    const classes = classNames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    });

    if (btnType === ButtonType.Link && href) {
        return (
            <a
                className={classes}
                href={href}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
};

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
};

export default Button;
