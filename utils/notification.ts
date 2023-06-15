import * as Notifications from 'expo-notifications';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('isci.db');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

function fetchAllUsers() {
  return new Promise((resolve: (value: string) => void, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          barangay TEXT,
          street TEXT,
          contactNumber TEXT,
          sex TEXT,
          birthdate TEXT,
          height TEXT,
          weight TEXT,
          age TEXT,
          allergies TEXT,
          diseases TEXT,
          medicine TEXT,
          avatar TEXT
        );
      `);
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (_, { rows }) => {
          const usersArray = rows._array;
          const formattedUsers = usersArray.map((user) => {
            const { name, sex, age, allergies, diseases, medicine } = user;
            return `- Name: ${name || ''}\n- Sex: ${sex || ''}\n- Age: ${age || ''}\n- Allergies: ${allergies || ''}\n- Diseases: ${diseases || ''}\n- Medicine: ${medicine || ''}\n`;
          });
          resolve(formattedUsers.join('\n'));
        },
        (_transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

async function scheduleUserNotification() {
  try {
    const users = await fetchAllUsers();

    const presentNotifications =
      await Notifications.getPresentedNotificationsAsync();
    if (presentNotifications.length > 0) {
      await Notifications.dismissAllNotificationsAsync();
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'User Personal and Medical Information',
        body: users,
        autoDismiss: false,
        priority: Notifications.AndroidNotificationPriority.MAX,
        sticky: true
      },
      trigger: null
    });
  } catch (error) {
    console.error(error);
  }
}

export { scheduleUserNotification };
