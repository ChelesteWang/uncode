import * as dialog from 'tauri/api/dialog';
import { setTitle } from 'tauri/api/window';
import { invoke, promisified } from 'tauri/api/tauri';

const TauriBridge = {
  openDialog() {
    dialog.open().then(result => {
      console.log(result);
    });
  },
  title(title: string) {
    setTitle(title);
    this.log('title', title);
  },
  log(name: string, message: string) {
    invoke({
      cmd: 'logOperation',
      event: name,
      payload: message,
    });
  },
  event(cmd: string, event: string, payload: string): Promise<any> {
    return promisified({
      cmd: cmd,
      event: event,
      payload: payload,
    });
  },
};

export default TauriBridge;
