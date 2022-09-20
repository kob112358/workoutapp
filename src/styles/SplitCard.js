import React from 'react';
import styles from './SplitCard.module.css';

const SplitCard = (props) => {
    return (
        <div className={styles.split_card}>
            {props.children}
        </div>
    );
};

export default SplitCard;