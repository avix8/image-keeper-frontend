import Button from "../Button";
import styles from "./Header.module.css";

import { ReactComponent as Logo } from "./res/logo.svg";

type HeaderProps = {
    isLoading: boolean;
    imageAmount: number;
};

const getInfo = (amount: number) =>
    `${amount} image${amount > 1 ? "s" : ""} stored in keeper`;

const Header = (props: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div>
                <Logo />
                <div className={styles.info}>
                    {props.isLoading ? "" : getInfo(props.imageAmount)}
                </div>
            </div>
            <Button prependIcon="upload" children="Upload image" />
        </header>
    );
};

export default Header;
