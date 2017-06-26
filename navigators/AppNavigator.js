import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, TabNavigator, TabRouter, createNavigator, createNavigationContainer} from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import WorkshopScreen from '../screens/WorkshopScreen';
import WorkshopShowScreen from '../screens/WorkshopShowScreen';
import IdeaScreen from '../screens/IdeaScreen';
import IdeaShowScreen from '../screens/IdeaShowScreen';
import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WorkshopListScreen from '../screens/WorkshopListScreen';
import IdeaListScreen from '../screens/IdeaListScreen';

const CustomTabBar = ({navigation}) => {
  const {routes} = navigation.state;
  return (
    <View style={styles.tabContainer}>
      {routes.map(route => (
        <TouchableOpacity onPress={() => navigation.navigate(route.routeName)} style={styles.tab} key={route.routeName}>
          <Text>{route.routeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CustomTabView = ({router, navigation}) => {
  const {routes, index} = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.container}>
      <ActiveScreen navigation={addNavigationHelpers({
        ...navigation,
        state: routes[index]
      })}/>
      <CustomTabBar navigation={navigation}/>
    </View>
  );
};

const CustomTabRouter = TabRouter({
  workshopStack: {
    screen: StackNavigator({
      workshop: {
        screen: WorkshopScreen
      },
      workshopShow: {
        screen: WorkshopShowScreen
      }
    }, {headerMode: 'none'})
  },
  ideaStack: {
    screen: StackNavigator({
      idea: {
        screen: IdeaScreen
      },
      ideaShow: {
        screen: IdeaShowScreen
      }
    }, {headerMode: 'none'})
  },
  newsStack: {
    screen: StackNavigator({
      news: {
        screen: NewsScreen
      },
      workshopNewsShow: {
        screen: WorkshopShowScreen
      },
      ideaNewsShow: {
        screen: IdeaShowScreen
      }
    }, {headerMode: 'none'})
  },
  profileStack: {
    screen: StackNavigator({
      profile: {
        screen: ProfileScreen
      },
      workshopListStack: {
        screen: StackNavigator({
          workshopList: {
            screen: WorkshopListScreen
          },
          workshopListShow: {
            screen: WorkshopShowScreen
          }
        }, {headerMode: 'none'})
      },
      ideaListStack: {
        screen: StackNavigator({
          ideaList: {
            screen: IdeaListScreen
          },
          ideaListShow: {
            screen: IdeaShowScreen
          }
        }, {headerMode: 'none'})
      }
    }, {headerMode: 'none'})
  }
}, {
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#FF5964',
    inactiveTintColor: '#A4A9AD'
  }
});

export const AppNavigator = TabNavigator({
  auth: {
    screen: AuthScreen
  },
  main: {
    screen: createNavigator(CustomTabRouter)(CustomTabView)
  }
}, {
  // navigationOptions: {
  //     tabBarVisible: false
  // },
  // lazy: true
});

const AppWithNavigationState = ({dispatch, nav}) => (<AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>);

function mapStateToProps({nav}) {
  return {nav};
}

export default connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContainer: {
    flexDirection: 'row',
    height: 48
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4
  }
});
