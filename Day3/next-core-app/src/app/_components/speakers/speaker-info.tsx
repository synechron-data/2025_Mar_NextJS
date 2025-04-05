'use client'

import { useEffect, useState } from 'react';
import styles from './speaker-info.module.css';
import { Speaker } from '@/app/(page-components)/conference/models/speaker';

interface SpeakerInfoProps {
    id: string
}

// CSR: Client Side Rendering
const SpeakerInfo = ({ id }: SpeakerInfoProps) => {
    const [speaker, setSpeaker] = useState<Speaker>();

    useEffect(() => {
        (async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_SPEAKERS_API_URL}/${id}`;
                const response = await fetch(url);
                const data = await response.json();
                setSpeaker(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id]);

    return (
        <div className={styles.infoContainer}>
            <div className={styles.descText}>
                Last Rendered: {new Date().toLocaleTimeString()}
            </div>
            {
                speaker ? <div>
                    <h3 className={styles.titleText}>{speaker.name}</h3>
                    <h5 className={styles.descText}>About: {speaker.bio}</h5>
                    {
                        speaker.sessions &&
                        speaker.sessions.map(({ name, id }) => (
                            <div key={id}>
                                <h5 className={styles.descText}>Session: {name}</h5>
                            </div>
                        ))
                    }
                </div> : <h3 className={styles.titleText}>No Details for the Speaker Found</h3>
            }
        </div>
    );
}

export default SpeakerInfo;