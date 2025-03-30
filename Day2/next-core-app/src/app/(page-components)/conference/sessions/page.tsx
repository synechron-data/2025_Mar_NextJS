import styles from '../conference.module.css';
import { Session } from '../models/session';

// SSR - Server Side Rendering
async function fetchSessions() {
    // Fetch sessions from a Database
    // Fetch sessions from a File
    // Fetch sessions from a API call
    const url = process.env.SESSIONS_API_URL;
    const response = await fetch(url!);
    const sessions: Array<Session> = await response.json();
    return sessions;
}

export default async function Sessions() {
    const sessions: Array<Session> = await fetchSessions();

    return (
        <div className={styles.parentContainer}>
            <div>
                Last Rendered: {new Date().toLocaleTimeString()}
            </div>
            
            <h1>Welcome to Technizer India Sessions</h1>
            {
                sessions &&
                sessions.map(
                    ({ id, title, description, room, day, track, speakers }) => (
                        <div key={id} className={styles.infoContainer}>
                            <h3 className={styles.titleText}>{title}</h3>
                            {speakers &&
                                speakers.map(({ id, name }) => (
                                    <h3 key={id} className={styles.titleText}>Speaker: {name}</h3>
                                ))}
                            <h5 className={styles.descText}>{description}</h5>
                            <h4 className={styles.infoText}>Room: {room}</h4>
                            <h4 className={styles.infoText}>Day: {day}</h4>
                            <h4 className={styles.infoText}>Track: {track}</h4>
                        </div>
                    )
                )
            }
        </div>
    );
}