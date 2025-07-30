import { useState, useEffect, useRef } from 'react';
import { getToken } from "../helpers/authorization.helper.js";
import { setCurrentTrack, addPlayedTrack, getTracks, shuffleTracks } from "../helpers/track-manager.helper.js";
import { playSelectedPlaylist } from "../helpers/playlist.helper.js";
import playButton from '../assets/play-button.png';
import pauseButton from '../assets/pause-button.png';

import styles from '../styles/WebPlayback.module.css';

function WebPlayback({deviceId, setDeviceId, playStarted, setPlayStarted}) {

    const scriptRef = useRef(null);
    const [is_paused, setPaused] = useState(true);
    const [player, setPlayer] = useState(undefined);
    const [is_active, setActive] = useState(() => {
        const storedActive = localStorage.getItem('is_active');
        return storedActive ? JSON.parse(storedActive) : false;
    });
    const [current_track, setTrack] = useState(() => {
        const storedTrack = localStorage.getItem('track');
        const track = storedTrack ? JSON.parse(storedTrack) : undefined;
        setCurrentTrack(track);
        return track;
    });

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.onerror = () => console.error('Failed to load script');

        document.body.appendChild(script);
        scriptRef.current = script;

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = 
                new window.Spotify.Player({
                    name: 'DJ Joubi Player',
                    getOAuthToken: async cb => { 
                        const accessToken = await getToken();
                        cb(accessToken); 
                    }
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                setDeviceId(null);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                console.log(state);
                addPlayedTrack(state.track_window.current_track);
                setTrack(state.track_window.current_track);
                localStorage.setItem('track', JSON.stringify(state.track_window.current_track));

                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state) ? setActive(false) : setActive(true); 
                    localStorage.setItem('is_active', JSON.stringify(state));
                });

            }));

            player.connect();

            return () => {
                player.disconnect();
            }

        };

    }, []);


    const playLastPlaylist = async () => {
        const tracks = getTracks();
        const trackIds = shuffleTracks(tracks);
        await playSelectedPlaylist(trackIds, deviceId);
        setPlayStarted(true);
    }

    const togglePlay = async () => {
        playStarted ? player.togglePlay() : playLastPlaylist();
    }

    const playPrevious = async () => {
        playStarted ? player.previousTrack() : playLastPlaylist();
    }

    const playNext = async () => {
        playStarted ? player.nextTrack() : playLastPlaylist();
    }

    const webPlayback = !is_active ? 
        <>
            <div className={styles.playerContainer}>
                <div className={styles.mainWrapper + " " + styles.unavailable}>
                    <b>Web playback is currently unavailable. Select a playlist to start the jam session.</b>
                </div>
            </div>
        </>
        :
        <>
            <div className={styles.playerContainer}>
                <div className={styles.mainWrapper}>

                    <div className={styles.nowPlaying}>
                        <img src={current_track?.album?.images[0]?.url} className={styles.nowPlayingCover} alt="" />

                        <div>
                            <div className={styles.nowPlayingName}>{current_track?.name}</div>
                            <div className={styles.nowPlayingArtist}>{current_track?.artists[0]?.name}</div>
                        </div>
                    </div>

                    <div className={styles.playControls}>
                        <div className={styles.trackSelectContainer}>
                            <button className={styles.btnSpotify} aria-label="Previous track" onClick={() => { playPrevious() }} >
                                &lt;&lt;
                            </button>
                        </div>

                        <button className={styles.btnPlay} aria-label={is_paused ? "Play" : "Pause "} onClick={() => { togglePlay() }} >
                            <img className={styles.btnPlayImg} src={is_paused ? playButton : pauseButton} alt=""/>
                        </button>

                        <div className={styles.trackSelectContainer}>
                            <button className={styles.btnSpotify} aria-label="Next track" onClick={() => { playNext() }} >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>;

        return (
            <>
                {webPlayback}
            </>
        )
}

export default WebPlayback;
