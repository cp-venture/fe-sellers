import styled from 'styled-components';
import css from '@styled-system/css';
import { Link } from 'react-scroll';

export const StyledContainer = styled.div(
  css({
    width: ['100%', '90vw'],
  }),
  {
    margin: 'auto',
    paddingTop: 100,
    paddingBottom: 150,
  }
);

export const StyledContent = styled.div(
  css({
    flexDirection: ['column', 'row'],
  }),
  {
    display: 'flex',
  }
);
export const StyledContentHeading = styled.h2(
  css({
    px: ['1rem', 0],
  }),
  {
    marginBottom: 20,
  }
);
export const StyledLeftContent = styled.div(
  css({
    flexDirection: ['column', 'row'],
    width: ['100%', '25%'],
  }),
  {
    flex: '0 0 auto',
  }
);
export const StyledLeftInnerContent = styled.div(
  css({
    background: ['#fff', 'transparent'],
    padding: ['1rem', 0],
  })
);

export const StyledRightContent = styled.div(
  css({
    p: {
      marginBottom: 20,
      padding: ['1rem', 0],
    },
    lineHeight: 1.8,
  })
);

export const StyledLink = styled(Link)(
  css({
    '&.active, :hover': {
      color: 'primary',
    },
  }),
  {
    fontSize: 14,
    textDecoration: 'none',
    padding: '10px 0',
    display: 'block',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
  }
);
