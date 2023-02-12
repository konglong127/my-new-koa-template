import path from "path";

export const server = [
  { port: "3000", type: "worker" },
  // { port: "3001", type: "worker" },
  // { port: "3002", type: "agent" },
];

export const environment = "dev";
// export const environment='pro';

export const mongodb = "mongodb://127.0.0.1:27017/test";

export const redis = {
  port: 6379,
  host: "127.0.0.1",
  options: { password: "root", db: 0 },
};

export const needCopy = [
  {
    src: path.resolve(__dirname, "./views"),
    dist: path.resolve(__dirname, "./dist/views"),
  },
  {
    src: path.resolve(__dirname, "./public"),
    dist: path.resolve(__dirname, "./dist/public"),
  },
  {
    src: path.resolve(__dirname, "./utils/keys"),
    dist: path.resolve(__dirname, "./dist/utils/keys"),
  },
];


