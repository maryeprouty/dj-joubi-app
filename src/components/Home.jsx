import { useEffect, useState } from "react"; 
import { getPlaylists, getTracks, playSelectedPlaylist } from "../helpers/playlist.helper.js";
import { shuffleTracks, clearSession } from "../helpers/track-manager.helper.js";
import WebPlayback from "./WebPlayback.jsx";

export default function Home() {

    const [playlists, setPlaylists] = useState([]);
    const [deviceId, setDeviceId] = useState(null);
    const [playStarted, setPlayStarted] = useState(false);

    useEffect(() => {
        async function fetchPlaylists() {
            const playlists = await getPlaylists();
            console.log(playlists);
            setPlaylists(playlists);
        }
        fetchPlaylists();
 
    }, []);

    const playPlaylist = async (playlist) => {
        const tracks = await getTracks(playlist.id);
        const trackIds = shuffleTracks(tracks);
        await playSelectedPlaylist(trackIds, deviceId);
        setPlayStarted(true);
    }

    return (
        <>
            <div className='card playlists-container'>
                <h2>Your Wedding Playlists</h2>
                <div className='playlists'>
                    <div className='playlist-row'>
                        {playlists.map((playlist) => (
                            <button key={playlist.id} className='playlist' onClick={() => 
                                playPlaylist(playlist)}>
                                <img src={playlist?.images[0]?.url} alt=''/>
                                <h3>{playlist?.name}</h3>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='clear-container'>
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