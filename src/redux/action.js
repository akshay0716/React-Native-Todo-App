export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASK_ID';

import axios from 'axios';

export const setTasks = tasks => dispatch => {
  dispatch({
    type: SET_TASKS,
    payload: tasks,
  });
};

export const setTaskId = id => dispatch => {
  dispatch({
    type: SET_TASK_ID,
    payload: id,
  });
};

// export const getPosts = () => {
//   let response = {};
//   return async dispatch => {
//     try {
//       response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
//         method: 'GET',
//         headers: {
//           'Contnt-Type': 'application.json',
//         },
//       });

//       console.log('data', response);
//     } catch (err) {
//       console.log('err signup', err);
//       throw err;
//     }

//     return response;
//   };
// };
