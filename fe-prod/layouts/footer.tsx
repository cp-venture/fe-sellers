import styled from 'styled-components';
import css from '@styled-system/css';
import { FormattedMessage } from 'react-intl';
const Box = styled.div(
  css({
    fontSize: 13,
    fontWeight: 400,
    color: '#77798C',
    px: 20,

    a: {
      color: 'primary',
    },
  }),
  {
    marginTop: 50,
    width: '100%',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
);
const Footer = () => {
  return (
    <Box>
      <FormattedMessage
        id='siteFooter'
        defaultMessage='PickBazar is a product of'
      />
      &nbsp;
      <a href='#' target='_blank'>
        RedQ, Inc.
      </a>
    </Box>
  );
};
export default Footer;
