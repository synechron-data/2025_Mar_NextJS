import styles from '../conference.module.css';
import { Speaker } from '../models/speaker';
import Link from "next/link";

// // SSG - Static Site Generation
// async function fetchSpeakers() {
//     // Fetch sessions from a Database
//     // Fetch sessions from a File
//     // Fetch sessions from a API call
//     const url = process.env.SPEAKERS_API_URL;
//     const response = await fetch(url!);
//     const sessions: Array<Speaker> = await response.json();
//     return sessions;
// }

// ISR - Incremental Static Regeneration
async function fetchSpeakers() {
    // Fetch sessions from a Database
    // Fetch sessions from a File
    // Fetch sessions from a API call
    const url = process.env.SPEAKERS_API_URL;
    const response = await fetch(url!, {
        next: {
            revalidate: 3600        // 1 Hour (3600 secs)
        }
    });
    const sessions: Array<Speaker> = await response.json();
    return sessions;
}

export default async function Speakers() {
    const speakers: Array<Speaker> = await fetchSpeakers();

    return (
        <div className={styles.parentContainer}>
            <div>
                Last Rendered: {new Date().toLocaleTimeString()}
            </div>
            <h1>Welcome to Technizer India Speakers</h1>
            {
                speakers.map(({ id, name, bio }) => (
                    <div key={id} className={styles.infoContainer}>
                        <Link
                            className={styles.bgLinks}
                            href={`/conference/speakers/${id}`}
                            prefetch={false}
                        >
                            <h3 className={styles.titleText}>{name}</h3>
                        </Link>
                        <h5 className={styles.descText}>{bio}</h5>
                    </div>
                ))
            }
        </div>
    );
}