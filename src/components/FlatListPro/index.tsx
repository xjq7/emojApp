import React, {useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import FlatList from '../FlatList';
import useInfinityList from '@hooks/useInfinityList';

function Component(
  {initData, fetchRequest, pageSize, page, ...restProps},
  ref,
) {
  const [
    array,
    isEnd,
    isRefresh,
    isLoadMore,
    onEndReached,
    onRefresh,
    onRefreshForce,
    onRefreshIndex,
  ] = useInfinityList(fetchRequest, {
    initData,
    pageSize,
    page,
  });

  useImperativeHandle(ref, () => ({
    onRefresh: onRefresh,
    onRefreshForce: onRefreshForce,
    onRefreshIndex: onRefreshIndex,
  }));

  return (
    <FlatList
      ref={ref}
      isEnd={isEnd}
      data={array}
      refreshing={isRefresh}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      {...restProps}
    />
  );
}

const RefComponent = React.forwardRef(Component);

RefComponent.propTypes = {
  fetchRequest: PropTypes.func.isRequired,
  initData: PropTypes.array,
  pageSize: PropTypes.number,
  page: PropTypes.number,
};

RefComponent.defaultProps = {
  fetchRequest: () => {},
  pageSize: 10,
  pageNo: 1,
};

export default RefComponent;
