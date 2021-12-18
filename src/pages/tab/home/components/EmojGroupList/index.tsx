import useInfinityList from '@hooks/useInfinityList';
import React, {useCallback, useState} from 'react';

function EmojGroupList() {
  const [isVisible, setIsVisible] = useState(false);
  // const [modalData, setModalData] = useState<ModalData>();

  // const fetchList = useCallback(o => {
  //   const body: GetEmojBody = {
  //     ...o.body,
  //   };
  //   if (type) {
  //     body.type = type;
  //   }
  //   if (name) {
  //     body.name = name;
  //   }
  //   return getEmojList(body).then(res => {
  //     const {data} = res;
  //     const {list: dataList = []} = data || {};
  //     return dataList;
  //   });
  // }, []);

  const [
    array,
    isEnd,
    isRefresh,
    isLoadMore,
    onEndReached,
    onRefresh,
    onRefreshForce,
  ] = useInfinityList(fetchList, {pageSize: 30});
  return;
}
export default EmojGroupList;
