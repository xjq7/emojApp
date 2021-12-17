import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, Animated} from 'react-native';
import Loading from '../Loading';
import Divider from '../Divider';
import StatusView, {StateStatus} from '../StatusView';
import themeMap from '@utils/themeMap';
import StickyView from './StickyView';
import RefreshControl from '../RefreshControl';

const FlatList = Animated.FlatList;

/**
 * data =[{data:[],header:{}}]
 *
 */

const Component = (
  {
    isEnd,
    data,
    stickyHeaderIndicesPro,
    ListHeaderComponent,
    refreshing,
    onRefresh,
    onScroll,
    ...restProps
  },
  ref,
) => {
  const scrollY = new Animated.Value(0);
  const _headerLayoutYs = new Map();
  const _stickyHeaderRefs = new Map();

  const renderEmpty = () => {
    return (
      <StatusView
        status={data ? StateStatus.StateEmpty : StateStatus.StateLoad}
        tips="暂无数据"
      />
    );
  };

  const renderFooter = () => {
    if (!data || data.length === 0) {
      return null;
    } else if (isEnd) {
      return (
        <Text
          style={{
            lineHeight: 30,
            alignSelf: 'center',
            color: themeMap.$BlackM,
          }}>
          已经到底了
        </Text>
      );
    } else {
      return <Loading />;
    }
  };

  const _getKeyForIndex = (index, childArray) => {
    const child = childArray[index];
    return child && child.key;
  };

  const _setStickyHeaderRef = (key, ref) => {
    if (ref) {
      _stickyHeaderRefs.set(key, ref);
    } else {
      _stickyHeaderRefs.delete(key);
    }
  };

  const _onLayout = (index, event, key, childArray) => {
    const layoutY = event.nativeEvent.layout.y;
    _headerLayoutYs.set(key, layoutY);
    const indexOfIndex = stickyHeaderIndicesPro.indexOf(index);
    const previousHeaderIndex = stickyHeaderIndicesPro[indexOfIndex - 1];
    if (previousHeaderIndex != null) {
      const previousHeader = _stickyHeaderRefs.get(
        _getKeyForIndex(previousHeaderIndex, childArray),
      );
      previousHeader &&
        previousHeader.setNextHeaderY &&
        previousHeader.setNextHeaderY(layoutY);
    }
  };

  const renderHeader = () => {
    let element = ListHeaderComponent;
    if (
      ListHeaderComponent &&
      stickyHeaderIndicesPro != null &&
      stickyHeaderIndicesPro.length > 0
    ) {
      const ListHeader = React.isValidElement(ListHeaderComponent)
        ? ListHeaderComponent
        : ListHeaderComponent();
      if (ListHeader.type === Fragment) {
        const childArray = React.Children.toArray(ListHeader.props.children);
        element = (
          <Fragment>
            {childArray.map((child, index) => {
              const indexOfIndex = child
                ? stickyHeaderIndicesPro.indexOf(index)
                : -1;
              if (indexOfIndex > -1) {
                const key = child.key;
                const nextIndex = stickyHeaderIndicesPro[indexOfIndex + 1];
                return (
                  <StickyView
                    key={key}
                    ref={ref => _setStickyHeaderRef(key, ref)}
                    nextHeaderLayoutY={_headerLayoutYs.get(
                      _getKeyForIndex(nextIndex, childArray),
                    )}
                    onLayout={event => _onLayout(index, event, key, childArray)}
                    scrollY={scrollY}>
                    {child}
                  </StickyView>
                );
              } else {
                return child;
              }
            })}
          </Fragment>
        );
      }
    }
    return element;
  };

  const renderDivider = () => {
    return <Divider height={1} color={themeMap.$PageBg} />;
  };

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY},
        },
      },
    ],
    {useNativeDriver: true, listener: onScroll}, // <-- 加上这一行
  );

  return (
    <FlatList
      ref={ref}
      data={data}
      ItemSeparatorComponent={renderDivider}
      ListFooterComponent={renderFooter()}
      ListEmptyComponent={renderEmpty()}
      ListHeaderComponent={renderHeader()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh && (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )
      }
      onScroll={handleScroll}
      {...restProps}
    />
  );
};

const RefComponent = React.forwardRef(Component);

RefComponent.propTypes = {
  isEnd: PropTypes.bool,
  stickyHeaderIndicesPro: PropTypes.arrayOf(PropTypes.number), // 头部sticky,同stickyHeaderIndices
};

RefComponent.defaultProps = {
  onEndReachedThreshold: 0.1,
  keyExtractor: (o, i) => i.toString(),
  initialNumToRender: 10,
  isEnd: true,
};

export default RefComponent;
