import styles from "./styles.module.scss";
import Link from "next/link";
import { stringToHandle } from "@/utlis/convert";
import {Fragment} from "react";

const CollectionExplore = ({ data }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                Explore our curated selection of the most renowned and beloved <span>brands</span>.
            </div>
            <div className={styles.imageList}>
                {data?.map((name, i) => {
                    if(i>5) return null;
                    const handle = stringToHandle(name);
                    if (!handle) return null;
                    return (
                        <Fragment key={i}>
                            {i !== 0 && <div className={styles.verticalDivider}></div>}
                            <Link href={'/collection/' + handle} className={styles.brandName}>
                                {name}
                            </Link>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default CollectionExplore;
