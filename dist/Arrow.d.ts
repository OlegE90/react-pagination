/// <reference types="react" />
/**
 * @prop {string} [className].
 * @prop {boolean} [isDisable] does row disable?
 * @prop {JSX.Element} children Element.
 * @prop {Function} onClick Click on <a>.
 */
export interface IProps {
    className?: string;
    disable?: boolean;
    children: JSX.Element;
    onClick: (e: any) => void;
}
export default function (props: IProps): JSX.Element;
