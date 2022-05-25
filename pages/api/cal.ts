import { NextApiRequest, NextApiResponse } from "next";
import nFetch from "../../utils/customFetch";

// https://gunn.pausd.org/cf_calendar/feed.cfm?type=ical&feedID=7654073B8805455AAB50D082A5DE0A70&isgmt=1
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ical = await nFetch(
    `https://gunn.pausd.org/cf_calendar/feed.cfm?type=ical&feedID=7654073B8805455AAB50D082A5DE0A70`
  );
  res.status(200).send(await ical.text());
};
