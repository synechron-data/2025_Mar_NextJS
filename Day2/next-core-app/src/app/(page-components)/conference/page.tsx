import { Metadata } from "next";
import styles from './conference.module.css';
import Image from "next/image";
// import Link from "next/link";

import conferenceImage from "../../images/home-image-1.jpg";

export const metadata: Metadata = {
  title: "Conference Page",
  description: "About Technizer India Conference"
}

export default function Conference() {
  return (
    <main>
      <div className={styles.bgWrap}>
        <Image
          src={conferenceImage}
          alt="Conference Picture"
          sizes='100vw'
          fill
          placeholder="blur"
          quality={100}
          style={{
            objectFit: 'cover'
          }} />
      </div>
      <h1 className={styles.bgHeader}>Welcome to Techinzer India Conference</h1>
      <h2 className={styles.bgText}>
        {/* <Link className={styles.bgLinks} href="/conference/speakers">
          View Speakers
        </Link> */}
        <a className={styles.bgLinks} href="/conference/speakers">
          View Speakers
        </a>
      </h2>
      <h2 className={styles.bgText}>
        {/* <Link className={styles.bgLinks} href="/conference/sessions">
          View Sessions
        </Link> */}
        <a className={styles.bgLinks} href="/conference/sessions">
          View Sessions
        </a>
      </h2>
    </main>
  );
}
