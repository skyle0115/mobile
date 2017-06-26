import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';

import {AppNavigator} from '../navigators/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'auth'}));
function navReducer(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

const rootReducer = combineReducers({nav: navReducer});

// workshopList: WorkshopListReducer,
// ideaList: IdeaListReducer,
// ideaShow: IdeaShowReducer,
// auth: FacebookLoginReducer,
// workshopShow: WorkshopShowReducer,
// profile: ProfileReducer,
// workshopLoad: WorkshopLoadingReducer,
// ideaLoad: IdeaLoadingReducer,
// news: NewsReducer,
// newsLoad: NewsLoadingReducer

export default rootReducer;
