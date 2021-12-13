import * as React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  StackRouter,
} from '@react-navigation/native';
import {StackView} from '@react-navigation/stack';

// 登录拦截路由白名单
// const noNeedLoginRoutes = [];

const InterceptStackRouter = (options: any) => {
  const router = StackRouter(options);
  return {
    ...router,
    getStateForAction(state: any, action: any, options: any) {
      // const { isLogin } = store.getState().userReducer;
      // const { name } = action.payload || {};
      // if (!isLogin && name && !noNeedLoginRoutes.includes(name)) {
      //   action.payload.name = 'authLogin';
      // }
      const result = router.getStateForAction(state, action, options);
      return result;
    },
  };
};

function InterceptStack(options: any) {
  const {state, descriptors, navigation} = useNavigationBuilder(
    InterceptStackRouter,
    options,
  );

  return (
    <StackView
      {...options}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export default createNavigatorFactory(InterceptStack);
