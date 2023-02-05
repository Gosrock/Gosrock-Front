import BorderBox from '@dudoong/ui/src/layout/BorderBox';
import HostButtons from './HostButtons';
import NewHost from './NewHost';
import { Spacing, Button } from '@dudoong/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstStep = () => {
  const [selectedHostId, setSelectedHostId] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <BorderBox padding={[36, 60]}>
        <NewHost />
        <HostButtons hostId={selectedHostId} setHostId={setSelectedHostId} />
      </BorderBox>
      <Spacing size={100} />
      <Button
        varient="primary"
        fullWidth={true}
        onClick={() => {
          navigate('/new/events/2', {
            state: {
              hostId: selectedHostId,
            },
          });
        }}
        disabled={selectedHostId === null}
      >
        호스트 만들기
      </Button>
    </>
  );
};

export default FirstStep;
