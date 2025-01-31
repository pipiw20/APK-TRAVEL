import SQLite from 'react-native-sqlite-storage';

// open a database
const db = SQLite.openDatabase(
  {
    name: 'TraveldiaryDB.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error('Error opening database:', error);
  },
);

// creat tables
const createUserTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pengguna (id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT,
                tgl_lahir TEXT,
                contact TEXT,
                social_media TEXT
            );`,
      [],
      () => {},
      error => {
        console.error('Error creating tables:', error);
      },
    );
  });
};

// Initialize database
createUserTables();

export default db;
