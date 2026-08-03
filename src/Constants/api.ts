// Android emulator can't use 'localhost' — it needs 10.0.2.2 to reach your machine.
// iOS simulator can use 'localhost' directly.
// A physical device needs your machine's LAN IP (e.g. 192.168.1.x), not localhost.
import { Platform } from 'react-native';

const DEV_HOST = Platform.select({
  android: '10.0.2.2',
  default: 'localhost',
});

export const BASE_URL = `http://${DEV_HOST}:3000/api`; // adjust port to match your .env PORT