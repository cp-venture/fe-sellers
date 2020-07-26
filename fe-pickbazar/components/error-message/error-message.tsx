import styled from 'styled-components';
export default function ErrorMessage({ message }) {
  return <StyledAside>{message}</StyledAside>;
}

const StyledAside = styled.aside({
  padding: '1.5rem',
  fontSize: 14,
  color: '#fff',
  backgroundColor: 'red',
});
