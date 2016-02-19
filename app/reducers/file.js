import { OPEN_FILE, OPEN_FILE_DISMISS_ERROR } from '../actions/file';

export default function (file = { name: '', isError: false }, action) {
  switch (action.type) {
    case OPEN_FILE:
      if (action.error) {
        console.log(action.payload);
        return {
          name: '',
          isError: true,
          error: action.payload
        };
      }

      return {
        ...action.payload,
        isError: false
      };
    case OPEN_FILE_DISMISS_ERROR:
      return {
        name: '',
        isError: false
      };
    default:
      return file;
  }
}
