import styles from "./Header.module.css";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import UploadButton from "../UploadButton";
import app from "../../store/app";

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
            <UploadButton disabled={app.isLoading} />
        </header>
    );
};

export default Header;
