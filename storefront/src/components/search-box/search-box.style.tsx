import styled from 'styled-components';
import css from '@styled-system/css';
import { shadow } from 'styled-system';
export const StyledForm = styled.form<any>(
  (props) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    width: props.minimal ? '100%' : 700,
    color: '#77798C',
    backgroundColor: props.minimal ? '#f3f3f3' : '#ffffff',
  }),
  shadow
);

export const StyledInput = styled.input(
  css({
    flexGrow: 1,
    fontSize: 15,
    px: 20,
    height: 48,
    color: '#77798C',
    backgroundColor: 'inherit',
  }),
  {
    border: 0,
    '&:focus': {
      outline: 0,
    },

    '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
      fontSize: 15,
      color: '#77798C',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
);
export const StyledCategoryName = styled.span(
  css({
    fontSize: 14,
    lineHeight: '38px',
    px: 15,
    color: '#009E7F',
    backgroundColor: '#f7f7f7',
  }),
  {
    fontWeight: 700,
    margin: '5px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  }
);

export const StyledSearchButton = styled.button({
  backgroundColor: '#009E7F',
  fontSize: 15,
  fontWeight: 700,
  color: '#ffffff',
  display: 'flex',
  height: 48,
  alignItems: 'center',
  border: 0,
  outline: 0,
  paddingLeft: 30,
  paddingRight: 30,
  cursor: 'pointer',
  flexShrink: 0,
});
