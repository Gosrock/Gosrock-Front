import { DetailTemplateProps } from '@components/events';
import { Divider, RoundBlock, Spacing, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import DetailMenu from '../DetailMenu';
import Remote from '../Remote';
import Tickets from '../Tickets';
import Summary from './Summary';

const PcPage = ({
  detail,
  tickets,
  openOverlay,
  ...props
}: DetailTemplateProps) => {
  return (
    <>
      <Spacing size={100} />
      <Wrapper {...props}>
        {/* 상단 헤더 */}
        <LeftContent>
          <Text typo="G_Header_24_B">{detail.name}</Text>
          <Summary detail={detail} />

          {/* 상세정보 */}
          <Spacing size={32} />
          <DetailMenu content={detail.content} />
        </LeftContent>
        <RightSticky>
          <Text typo="P_Header_16_SB">티켓</Text>
          <Divider line />
          {tickets && <Tickets tickets={tickets} />}
          <Remote openOverlay={openOverlay} />
        </RightSticky>
      </Wrapper>
    </>
  );
};

export default PcPage;

const Wrapper = styled.div`
  max-width: 936px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
`;

const LeftContent = styled.div``;

const RightSticky = styled(RoundBlock)`
  border: 1px solid black;
  position: sticky;
  position: -webkit-sticky;
  margin-top: 44px;
  top: 36px;
  margin-left: 22px;
  max-width: 356px;
  height: 300px;
`;