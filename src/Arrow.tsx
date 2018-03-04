import * as React from 'react';

/**
 * @prop {string} [className].
 * @prop {boolean} [isDisable] does arrow disable?
 * @prop {JSX.Element} children Element.
 * @prop {Function} onClick Click on <a>.
 */
export interface IProps {
    className?: string;
    disable?: boolean;
    children: JSX.Element;
    onClick: (e: any) => void;
}


export default function (props: IProps) {
    const {onClick, disable, className, children} = props;

    return disable ? (
        <li
            className={`${className} row_disable page-item`}
        >
            {children}
        </li>
    ) : (
        <li
            className={`${className} page-item`}
        >
            <a
                onClick={onClick}
                className="page-link"
            >
                {children}
            </a>
        </li>
    )
}