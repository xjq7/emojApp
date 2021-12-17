import {useState, useEffect, useReducer, useRef} from 'react';
/**
 *
 * @param {*} param
 * const options = { initData: [], pageSize: 10, page: 1 }
 *[onRefresh, onEndReached, array, isEnd, isRefresh, isLoadMore] = useInfinityList(fetchRequest,options)
 */
function useInfinityList<T>(
  fetchRequest: any,
  {initData = [], pageSize = 10, page = 1} = {},
) {
  const [array, setArray] = useState<T[] | boolean>(initData);
  const [num, setNum] = useState(page);
  const [size, setSize] = useState(pageSize);
  const [isEnd, setIsEnd] = useState(false);
  const isLoading = useRef(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [forceRefresh, setForceRefresh] = useReducer(x => x + 1, 0);
  const fetchMethod = (o: any) => Promise.resolve(fetchRequest(o));

  useEffect(() => {
    if (isLoading.current) {
      return;
    }
    isLoading.current = true;
    const getData = {body: {page: num, pageSize: size}};
    fetchMethod(getData).then(res => {
      if (!Array.isArray(res)) {
        throw Error('request result is not array');
      }
      const resTotal = res.length;
      const isFirstPage = num <= page;
      if (resTotal < size) {
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
      if (isFirstPage && resTotal === 0) {
        setArray([]);
      } else if (isFirstPage) {
        setArray(res);
      } else {
        setArray((array as T[]).concat(res));
      }
      isLoading.current = false;
      setRefresh(false);
      setLoadMore(false);
    });
  }, [num, size, forceRefresh]);

  useEffect(() => {
    setSize(pageSize);
  }, [pageSize]);

  useEffect(() => {
    setNum(page);
  }, [page]);

  const onEndReached = () => {
    if (isLoading.current || isEnd || isRefresh || isLoadMore) {
      return;
    }
    setLoadMore(true);
    setNum(num + 1);
  };

  const onRefresh = () => {
    setRefresh(true);
    setNum(page);
    setForceRefresh();
  };

  const onRefreshForce = () => {
    setArray(false);
    setNum(page);
    setForceRefresh();
  };

  const onRefreshIndex = (index: number) => {
    const getData = {body: {page: index + 1, pageSize: 1}};
    fetchMethod(getData).then(res => {
      if (!Array.isArray(res)) {
        throw Error('request result is not array');
      }
      if (res.length > 0) {
        const newArray = (array as T[]).concat([]);
        newArray[index] = res[0];
        setArray(newArray);
      }
    });
  };

  return [
    array,
    isEnd,
    isRefresh,
    isLoadMore,
    onEndReached,
    onRefresh,
    onRefreshForce,
    onRefreshIndex,
  ] as any;
}

export default useInfinityList;
