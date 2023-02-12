import redis from "./index";

export const hotInc = async (videoId: any, incNum: any) => {
  var data = await redis.zscore("videohots", videoId);
  if (data) {
    await redis.zincrby("videohots", incNum, videoId);
  } else {
    await redis.zadd("videohots", incNum, videoId);
  }
  return;
};

export const topHots = async (num: any) => {
  var paixu = await redis.zrevrange("videohots", 0, -1, "WITHSCORES");
  var newarr = paixu.slice(0, num * 2);
  var obj:any = {};
  for (let i = 0; i < newarr.length; i++) {
    if (i % 2 == 0) {
      obj[newarr[i] as keyof typeof obj] = newarr[i + 1];
    }
  }
  return obj;
};
