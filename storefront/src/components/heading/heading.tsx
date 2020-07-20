import styled from 'styled-components';
import css from '@styled-system/css';

type Props = {
  title: string;
  subtitle?: string;
  backdrop?: boolean;
  bgColor?: string;
};

export const Heading = ({ title, subtitle, backdrop, bgColor }: Props) => {
  return (
    <StyledBox style={{ backgroundColor: bgColor }}>
      <StyledH2>{title}</StyledH2>
      {subtitle && <StyledP>{subtitle}</StyledP>}
    </StyledBox>
  );
};

const StyledBox = styled.div(
  css({
    py: [30, 50],
    px: ['1rem', 0],
  }),
  {
    width: '100%',
  }
);

const StyledH2 = styled.h2(
  css({
    fontWeight: 900,
    color: 'primary',
    marginBottom: '1.5rem',
  })
);

const StyledP = styled.p({
  fontSize: 14,
  color: 'secondary',
});
