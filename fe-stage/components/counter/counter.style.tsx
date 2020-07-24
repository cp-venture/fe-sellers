import styled from 'styled-components';
import css from '@styled-system/css';
import { variant } from 'styled-system';
export const CounterBox = styled.div<any>(
  css({
    display: 'flex',
    background: 'primary',
    color: 'white',
    fontSize: 2,
    fontWeight: 6,
  }),
  {
    borderRadius: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    '&:focus': {
      outline: 'none',
    },
  },
  variant({
    variants: {
      horizontal: {
        width: 104,
        height: 36,
      },
      vertical: {
        width: 30,
        height: 90,
        flexDirection: 'column-reverse',
      },
      lightHorizontal: {
        width: 104,
        height: 36,
        background: 'lightColor',
        color: 'darkBold',
      },
      lightVertical: {
        width: 30,
        height: 90,
        flexDirection: 'column-reverse',
        background: 'lightColor',
        color: 'darkBold',
      },
    },
  })
);

export const CounterButton = styled.button<any>(
  {
    border: 'none',
    background: 'transparent',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 10,
    cursor: 'pointer',
    '&:hover, &:focus': {
      outline: 'none',
    },
  },
  variant({
    variants: {
      lightHorizontal: {
        color: 'darkRegular',
      },
      lightVertical: {
        color: 'darkRegular',
      },
    },
  })
);

export const CounterValue = styled.span({
  pointerEvents: 'none',
});
CounterValue.displayName = 'CounterValue';
CounterButton.displayName = 'CounterButton';
CounterBox.displayName = 'CounterBox';
CounterBox.defaultProps = {
  variant: 'horizontal',
};
