import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss'; // Import your CSS module here

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className={styles.stars}>
            {[...Array(fullStars)].map((_, index) => (
                <Image key={`full-${index}`} src="/images/Star.svg" alt="Full Star" width={16} height={16} />
            ))}
            {halfStar === 1 && <Image src="/images/star-half-yellow-icon.svg" alt="Half Star" width={16} height={16} />}
            {[...Array(emptyStars)].map((_, index) => (
                <Image key={`empty-${index}`} src="/images/star-line-yellow-icon.svg" alt="Empty Star" width={16} height={16} />
            ))}
        </div>
    );
};

export default StarRating;
