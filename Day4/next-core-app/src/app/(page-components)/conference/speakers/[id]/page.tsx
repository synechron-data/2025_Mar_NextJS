import Link from 'next/link';
import styles from '../../conference.module.css';
import SpeakerInfo from '@/app/_components/speakers/speaker-info';

export default function SpeakerDetails({ params }: { params: { id: string } }) {
    return (
        <div className={styles.parentContainer}>
            <Link href="/conference/speakers">Back to Speakers</Link>
            <SpeakerInfo id={params.id} />
        </div>
    );
}