import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = () => {
  const uri = process.env.MONGO as string;

  if (database) {
    return;
  }

  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err: any) => {
      if (err) {
        console.log(err);
      }
    }
  );

  database = mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  console.log("Disconnecting the database");
  mongoose.disconnect();
};

export const getDatabase = () => {
  console.log(database);
  return database;
};
