
// Keep list of played tracks by title & artist since track ids may be inconsistent
let playedTracks = localStorage.getItem('played') ? new Map(JSON.parse(localStorage.getItem('played'))) : new Map();
let tracksToPlay = localStorage.getItem('tracks') ? JSON.parse(localStorage.getItem('tracks')) : [];
let currentTrackName = null; 
let currentTrackId = null; 

export function addPlayedTrack(track) {
    if (currentTrackName) {
        playedTracks.set(currentTrackName.toLowerCase(), currentTrackId);
        localStorage.setItem('played', JSON.stringify([...playedTracks]));
    }
    currentTrackName = getTrackName(track);
    currentTrackId = track.id;
    console.log('Current song: ', currentTrackName);
    console.log('Played: ', playedTracks);
}

export function setCurrentTrack(track) {
    currentTrackName = getTrackName(track);
    currentTrackId = track.id;
}

export function getTracks() {
    return tracksToPlay;
}

export function clearSession() {
    playedTracks = new Map();
}

// Randomly shuffle the tracks in a playlist
export function shuffleTracks(tracks) {
    localStorage.setItem('tracks', JSON.stringify(tracks));
    let trackIds = [];

    let trackMap = new Map();
    tracks?.items?.forEach(item => trackMap.set(`${item?.track?.name}:${item?.track?.artists[0]?.name}`, item?.track?.id));

    if (tracks?.items?.length === 1) {
        trackIds.push(tracks?.items[0]?.track?.id);
        return trackIds;
    }

    trackMap?.forEach((value, key) => {
        if (key.toLowerCase() !== currentTrackName.toLowerCase() && !playedTracks.has(key.toLowerCase())) {
            trackIds.push(value);
        }
    });

    for (let i = trackIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = trackIds[i];
        trackIds[i] = trackIds[j];
        trackIds[j] = temp;
    }

    if (trackMap?.has(currentTrackName)) {
        trackIds.unshift(currentTrackId);
    }
    return trackIds;
}

function getTrackName(track) {
    return `${track?.name}:${track?.artists[0]?.name}`;
}
