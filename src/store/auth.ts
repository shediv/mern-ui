/**
 * React JS APP
 *
 */

import { Subject, Subscription } from 'rxjs';

type IState = {
  authStatus: string;
};

const subject = new Subject();
const initialState = {
  authStatus: 'None',
};

let state: IState = initialState;

const authStore = {
  // eslint-disable-next-line
  subscribe: (setState: any): Subscription => subject.subscribe(setState),
  getData: (): IState => state,
  setData: (data: { authStatus: string }): void => {
    state = {
      ...state,
      authStatus: data.authStatus,
    };
    subject.next(state);
  },
  clearData: (): void => {
    state = initialState;
    subject.next(state);
  },
};

export default authStore;
