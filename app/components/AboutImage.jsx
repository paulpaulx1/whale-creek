// components/AboutImage.jsx
import Image from 'next/image';
import styles from './AboutImage.module.css';

const AboutImage = () => {
  return (
    <div className={styles.imageContainer}>
      <Image
        src="/images/DavidFinegan.jpg"
        alt="David Finegan, Master Builder and Founder of Whale Creek Construction"
        className={styles.image}
        width={600}
        height={500}
        priority
      />
    </div>
  );
};

export default AboutImage;