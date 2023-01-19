import Main from '@components/shared/Layout/Main';
import { Divider, ListHeader, NavBar } from '@dudoong/ui';
import { CartApi } from '@lib/apis/cart/CartApi';
import { AddCartResponse } from '@lib/apis/cart/cartType';
import DDHead from '@components/shared/Layout/NextHead';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import BookHeader from './blocks/BookHeader';
import { setSsrAxiosHeader } from '@lib/utils/setSsrAxiosHeader';

const Order = ({ data }: { data: AddCartResponse }) => {
  const router = useRouter();
  console.log(data);

  return (
    <>
      <DDHead title="두둥!" />
      <Main>
        <NavBar
          backHandler={() => {
            router.back();
          }}
        />
        <BookHeader
          title="결제하기"
          description={['고스락 제 23회 정기공연', '일반티켓', 3]}
        />
        <Divider />
        <ListHeader size="listHeader_18" title={'내 티켓 확인하기'} />
      </Main>
    </>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { state } = context.query;
  const { cookies } = context.req;

  if (!state) {
    setSsrAxiosHeader(cookies);
    const data = await CartApi.RECENT_CARTLINE();
    if (data) return { props: { data } };
    else return { redirect: { destination: '/', permanent: false } };
  } else {
    const data = JSON.parse(state as string) as AddCartResponse;
    return { props: { data } };
  }
};
