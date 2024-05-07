import { VisuallyHidden } from '~/components/visually-hidden';
import { useReducedMotion, useSpring } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
import { delay } from '~/utils/delay';
import { classes } from '~/utils/style';
import styles from './decoder-text.module.css';

// prettier-ignore
const glyphs = [
  'أ', 'إ', 'ؤ', 'ئ', 'آ',
  'ك', 'كي', 'كو', 'كي', 'كو',
  'سا', 'شي', 'سو', 'سي', 'سو',
  'تا', 'تشي', 'تسو', 'تي', 'تو',
  'نا', 'ني', 'نو', 'ني', 'نو',
  'ها', 'هي', 'هو', 'هي', 'هو',
  'ما', 'مي', 'مو', 'مي', 'مو',
  'يا', 'يو', 'يو', 'ا',
  'را', 'ري', 'رو', 'ري', 'رو',
  'وا', 'وي', 'وي', 'و', 'ن',
  'غا', 'غي', 'غو', 'غي', 'غو',
  'زا', 'زي', 'زو', 'زي', 'زو',
  'دا', 'دي', 'دو', 'دي', 'دو',
  'با', 'بي', 'بو', 'بي', 'بو',
  'با', 'بي', 'بو', 'بي', 'بو',
];

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
};

function shuffle(content, output, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: CharType.Value, value };
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length);
      return { type: CharType.Glyph, value: glyphs[rand] };
    }

    return { type: CharType.Glyph, value: output[index].value };
  });
}

export const DecoderText = memo(
  ({ text, start = true, delay: startDelay = 0, className, ...rest }) => {
    const output = useRef([{ type: CharType.Glyph, value: '' }]);
    const container = useRef();
    const reduceMotion = useReducedMotion();
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

    useEffect(() => {
      const containerInstance = container.current;
      const content = text.split('');
      let animation;

      const renderOutput = () => {
        const characterMap = output.current.map(item => {
          return `<span class="${styles[item.type]}">${item.value}</span>`;
        });

        containerInstance.innerHTML = characterMap.join('');
      };

      const unsubscribeSpring = decoderSpring.on('change', value => {
        output.current = shuffle(content, output.current, value);
        renderOutput();
      });

      const startSpring = async () => {
        await delay(startDelay);
        decoderSpring.set(content.length);
      };

      if (start && !animation && !reduceMotion) {
        startSpring();
      }

      if (reduceMotion) {
        output.current = content.map((value, index) => ({
          type: CharType.Value,
          value: content[index],
        }));
        renderOutput();
      }

      return () => {
        unsubscribeSpring?.();
      };
    }, [decoderSpring, reduceMotion, start, startDelay, text]);

    return (
      <span className={classes(styles.text, className)} {...rest}>
        <VisuallyHidden className={styles.label}>{text}</VisuallyHidden>
        <span aria-hidden className={styles.content} ref={container} />
      </span>
    );
  }
);
