import React from 'react';
import styled, { keyframes } from 'styled-components';
import css from '@styled-system/css';
import { compose, variant, border, space } from 'styled-system';

export const StyledButton = styled.button(
  (props) =>
    css({
      px: '15px',
      py: 0,
      fontSize: [15],
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      color: props.disabled ? 'labelColor' : 'white',
      bg: props.disabled ? 'borderColor' : 'primary',

      '&:hover': {
        color: props.disabled ? 'labelColor' : 'white',
        bg: props.disabled ? 'borderColor' : 'primaryHover',
      },
    }),
  {
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    textAlign: 'center',
    height: '38px',
    textDecoration: 'none',
    fontFamily: 'inherit',
    fontWeight: 700,
    border: 0,
    borderRadius: 6,
    transition: '0.35s ease',
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none',
    },
  },
  variant({
    variants: {
      outlined: {
        color: 'primary',
        bg: 'white',
        border: 1,
        borderColor: 'borderColor',
        '&:hover': {
          borderColor: 'primary',
          color: 'primary',
          bg: 'white',
        },
      },
      primary: {
        color: 'white',
        bg: 'primary',
        '&:hover': {
          bg: 'primaryHover',
        },
      },
      secondary: {
        color: 'primary',
        bg: 'white',
        border: 2,
        borderColor: '#f7f7f7',
        '&:hover': {
          color: 'white',
          bg: 'primary',
        },
      },
      text: {
        color: 'primary',
        bg: 'transparent',
        '&:hover': {
          bg: 'transparent',
          color: 'primaryHover',
        },
      },
      select: {
        width: 26,
        height: 26,
        lineHeight: 1,
        flexShrink: 0,
        border: '1px solid',
        borderColor: 'darkRegular',
        borderRadius: 13,
        padding: 0,
        color: 'darkRegular',
        bg: 'transparent',
        '&.selected': {
          bg: 'primary',
          color: 'white',
          borderColor: 'primary',
        },
        '&:hover:not(.selected)': {
          bg: 'transparent',
          color: 'primary',
          borderColor: 'primary',
        },
      },
    },
  }),
  variant({
    prop: 'size',
    variants: {
      big: {
        height: '48px',
        px: 30,
      },
      small: {
        height: '30px',
        fontSize: 14,
      },
    },
  }),
  compose(border, space)
);
const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  border: 3px solid #ffffff;
  border-top: 3px solid ${(props) => (props.color ? props.color : '#009e7f')};
  border-radius: 50%;
  transition-property: transform;
  animation-name: ${rotate};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
type Props = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type: 'submit' | 'button';
  [key: string]: unknown;
};
export type Ref = HTMLButtonElement;
export const Button = React.forwardRef<Ref, Props>(
  ({ children, disabled, loading = false, ...props }, ref) => (
    <StyledButton ref={ref} {...props} disabled={disabled}>
      {children}
      {loading && <Spinner />}
    </StyledButton>
  )
);
