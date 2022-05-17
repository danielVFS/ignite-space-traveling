import { Dispatch, SetStateAction } from 'react';

export enum PLAY_STATUS {
  PLAY = '_play',
  STOP = '_stop',
}

const pitch = 1;
const rate = 1;

export async function speak(
  textToRead: string,
  onEndCallback: Dispatch<SetStateAction<PLAY_STATUS>>,
  synth: SpeechSynthesis
): Promise<void> {
  if (synth.speaking) {
    return;
  }

  if (textToRead !== '') {
    const utterThis = new SpeechSynthesisUtterance();

    const voices = synth.getVoices();
    const ptBrVoice = voices?.find(voice => /pt-BR/.test(voice.lang));

    utterThis.onend = event => {
      onEndCallback(PLAY_STATUS.PLAY);
    };
    utterThis.onerror = event => {
      throw Error('SpeechSynthesisUtterance.onerror');
    };

    utterThis.pitch = pitch;
    utterThis.text = textToRead;
    utterThis.lang = 'pt-BR';
    utterThis.voice = ptBrVoice;
    utterThis.rate = rate;

    synth.speak(utterThis);
  }
}
