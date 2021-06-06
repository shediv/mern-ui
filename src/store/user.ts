/**
 * React JS APP
 *
 */

import { Subject, Subscription } from 'rxjs';
import { UserData } from 'types/user';

type IState = {
  userData?: UserData;
};

const subject = new Subject();
const initialState = {};

let state: IState = initialState;

const userStore = {
  // eslint-disable-next-line
  subscribe: (setState: any): Subscription => subject.subscribe(setState),
  getData: (): IState => state,
  setData: (data: { userData: UserData }): void => {
    state = {
      ...state,
      userData: { ...state.userData, ...data.userData },
    };
    subject.next(state);
  },
  clearData: (): void => {
    state = initialState;
    subject.next(state);
  },
};

export default userStore;
