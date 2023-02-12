import Redis from "ioredis";
const redis = new Redis(6379, "127.0.0.1", { password: "root", db: 0 });

redis.on("error", (err: any) => {
  if (err) {
    console.log("Redis链接错误");
    console.log(err);
    redis.quit();
  }
});

redis.on("ready", () => {
  console.log("redis connect success");
});

export default redis;
