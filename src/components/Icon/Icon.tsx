import { useEffect, useState } from "react";

import styles from "./Icon.module.css";

function useDynamicSVGImport(name: string) {
    const [SvgIcon, setSvgIcon] = useState<React.FC<
        React.SVGProps<SVGSVGElement>
    > | null>(null);

    useEffect(() => {
        import(
            `!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/icons/${name}.svg`
        ).then((file) => {
            setSvgIcon(file.default);
        });
    }, [name]);

    return SvgIcon;
}

type IconProps = {
    name: string;
    color?: string;
    size?: string;
};

const Icon = ({ name }: IconProps) => {
    const SvgIcon = useDynamicSVGImport(name);
    if (!SvgIcon) {
        return <svg className={styles.icon}></svg>;
    }
    return <SvgIcon className={styles.icon} />;
};

export default Icon;
