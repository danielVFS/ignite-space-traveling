import { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

import { PLAY_STATUS, speak } from '../../services/speechSynth';

import { AudioSpectrum } from './AudioSpectrum';

import styles from './player.module.scss';
import { ReadTime } from './ReadTime';

interface PlayerProps {
  text: string;
}

export function Player({ text }: PlayerProps): JSX.Element {
  const [textToRead] = useState(text);
  const [playStatus, setPlayStatus] = useState(PLAY_STATUS.PLAY);

  const handleClick = (): void => {
    speechSynthesis.cancel();
    setPlayStatus(prev => {
      if (prev === PLAY_STATUS.PLAY) {
        speak(textToRead, setPlayStatus, window.speechSynthesis);
        return PLAY_STATUS.STOP;
      }
      return PLAY_STATUS.PLAY;
    });
  };

  return (
    <div className={styles.player}>
      <ReadTime loaded={playStatus === PLAY_STATUS.STOP} />
      <button
        type="button"
        title="Tocar/pausar aúdio"
        onClick={() => handleClick()}
      >
        {playStatus === PLAY_STATUS.PLAY ? <FaPlayCircle /> : <AudioSpectrum />}
      </button>
    </div>
  );
}
