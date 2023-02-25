import { KeyOfPalette, ListRow } from '@dudoong/ui';
import Chevron from '@assets/chevron.svg';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

interface ShortcutsProps {
  text: string;
  textColor?: KeyOfPalette;
  url?: string;
  onClick?: () => void;
}

const Shortcuts = ({
  text,
  textColor = 'gray_500',
  url,
  onClick,
}: ShortcutsProps) => {
  const router = useRouter();
  return (
    <StyledListRow
      text={text}
      textColor={textColor}
      rightElement={<Chevron />}
      onClick={url ? () => router.push(`${url}`) : onClick}
    />
  );
};

export default Shortcuts;

const StyledListRow = styled(ListRow)`
  cursor: pointer;

  transform: scale(1);
  transition: all 0.1s ease-out;

  :active {
    transform: scale(0.99);
  }
`;
