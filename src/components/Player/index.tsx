import { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

import { PLAY_STATUS, speak } from '../../services/speechSynth';

import { AudioSpectrum } from './AudioSpectrum';

import styles from './player.module.scss';

const text =
  'O desafio aqui é me propor a explicar para você o que é código limpo da maneira mais objetiva possível, sem deixar confusões e, no mínimo, alimentar a sua curiosidade em saber mais sobre o assunto.';

export function Player(): JSX.Element {
  const [textToRead, setTextToRead] = useState(text);
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
