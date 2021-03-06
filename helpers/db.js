import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUrl TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        (tx, result) => {
          resolve();
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title, imageUrl, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO places (title, imageUrl, address, lat, lng) VALUES (?, ?, ?, ?, ?);",
        [title, imageUrl, address, lat, lng],
        (tx, result) => {
          resolve(result);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places;",
        [],
        (tx, result) => {
          resolve(result);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
