import styled from 'styled-components';
import { background } from 'styled-system';
import css from '@styled-system/css';
export const Box = styled.div(
  css({
    height: [200, '100vh'],
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    // backgroundColor: #f7f7f7;
  }
);
export const Image = styled.div<any>(
  css({
    backgroundSize: ['cover'],
  }),
  {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  background
);

export const Content = styled.div(
  css({
    px: ['15px'],
    pt: [40, 0],
  }),
  {
    position: 'relative',
    zIndex: 2,
  }
);
export const Title = styled.h2(
  css({
    fontSize: [17, 30, 45],
    color: 'darkBold',
  }),
  {
    fontWeight: 700,
    marginBottom: 15,
    textAlign: 'center',
  }
);
export const Description = styled.p(
  css({
    fontSize: [14, 15, 19],
    color: 'darkRegular',
    marginBottom: [null, 60],
    display: ['none', 'block'],
  }),
  {
    fontWeight: 400,
    lineHeight: 1.5,
    textAlign: 'center',
  }
);

export const SearchWrapper = styled.div(
  css({
    display: ['none', 'flex'],
    justifyContent: 'center',
  })
);
