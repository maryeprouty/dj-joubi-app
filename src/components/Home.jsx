import { useEffect, useState } from "react"; 
import { getPlaylists, getTracks, playSelectedPlaylist, pausePlayback, resumePlayback } from "../helpers/playlist.helper.js";
import { shuffleTracks, clearSession } from "../helpers/track-manager.helper.js";
import WebPlayback from "./WebPlayback.jsx";
import styles from '../styles/Playlists.module.css';

export default function Home() {

    const [playlists, setPlaylists] = useState([]);
    const [deviceId, setDeviceId] = useState(null);
    const [playStarted, setPlayStarted] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [prevPlaylist, setPrevPlaylist] = useState(null);

    useEffect(() => {
        async function fetchPlaylists() {
            const playlists = await getPlaylists();
            setPlaylists(playlists);
        }
        fetchPlaylists();
 
    }, []);

    const playPlaylist = async (playlist) => {
        if (playlist === selectedPlaylist) {
            // If this playlist is already playing, pause it.
            await pausePlayback(deviceId);
            setPrevPlaylist(selectedPlaylist);
            setSelectedPlaylist(null);
        } else if (selectedPlaylist === null && playlist === prevPlaylist) {
            // If this playlist was played most recently before pausing, 
            // resume playback without reshuffling.
            await resumePlayback(deviceId);
            setSelectedPlaylist(playlist);
        } else {
            const tracks = await getTracks(playlist.id);
            const trackIds = shuffleTracks(tracks);
            await playSelectedPlaylist(trackIds, deviceId);
            setPrevPlaylist(selectedPlaylist);
            setSelectedPlaylist(playlist);
            setPlayStarted(true);
        }
    }

    return (
        <>
            <div className={'card ' + styles.playlistsContainer}>
                <h2>Your Wedding Playlists</h2>
                <div className={styles.playlists}>
                    <div className={styles.playlistRow}>
                        {playlists.map((playlist) => (
                            <button key={playlist.id} 
                            className={`${styles.playlist} ${playlist === selectedPlaylist ? styles.selectedPlaylist : styles.unselectedPlaylist}`} 
                            onClick={() => 
                                playPlaylist(playlist)}>
                                <img src={playlist?.images[0]?.url} alt=''/>
                                <h3>{playlist?.name}</h3>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.clearContainer}>
                <button onClick={clearSession}>
                    Clear Jam Session
                </button>
            </div>
            <WebPlayback 
                deviceId={deviceId} 
                setDeviceId={setDeviceId} 
                playStarted={playStarted} 
                setPlayStarted={setPlayStarted}
            />
        </>
    )
}