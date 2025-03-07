import "dotenv/config";
import * as fs from "fs";

import csv from "fast-csv";

import { pb } from "./src/lib/pocketbase.js";
import type { PbVox } from "./src/lib/type.js";
import { logger } from "./src/logger.js";
interface IVox {
  CandidateLogin: string;
  NumberOfVotes: string;
  Voters: string;
}

interface IVoxTransformed {
  CandidateLogin: string;
  NumberOfVotes: string;
  Voters: string[];
}

interface IRush {
  No: string;
  Assigned: string;
  Evaluator: string;
  "Eval Time": string;
  "Team Leader": string;
  "Team Members": string;
  Name: string;
  level: string;
  Pass: string;
  "Evaluator Comments on each member": string;
}

interface IRushTransformed {
  TeamMembers: string;
  level: string;
  Pass: string;
  Comments: string;
}

// Comment and uncomment to run the script

const processCSV = async (filePath) => {
  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .pipe(csv.format<IVox, IVoxTransformed>({ headers: true }))
    .transform(async (data, next) => {
      const payload = {
        CandidateLogin: data.CandidateLogin,
        NumberOfVotes: data.NumberOfVotes,
        Voters: data.Voters.split(","),
      };

      const users = await pb.collection("pisciner").getFullList({
        filter: "is_pisciner=true",
        sort: "login",
      });

      const batch = pb.createBatch();
      const voteFrom = payload.Voters.map(
        (voter) =>
          users.find((user) => user.login === voter.trim().toLocaleLowerCase())
            ?.id,
      );

      const vox = await pb
        .collection<PbVox>("vox")
        .getOne(payload.CandidateLogin)
        .catch(() => undefined);

      const vote_from = vox
        ? [...new Set([...vox.vote_from, ...voteFrom])].filter(Boolean)
        : voteFrom.filter(Boolean);

      batch.collection("vox").upsert({
        id: payload.CandidateLogin,
        pisciner: users.find((user) => user.login === payload.CandidateLogin)!
          .id,
        vox: vox ? vox.vox + +payload.NumberOfVotes : +payload.NumberOfVotes,
        vote_from: vote_from,
      });

      try {
        await batch.send();
      } catch (error) {
        logger.error(error);
      }

      return next(null, payload);
    });
};

// Process both CSV files
// processCSV("./data/vox1.csv");
// processCSV("./data/vox2.csv");

// fs.createReadStream("./data/rush00.csv")
//   .pipe(csv.parse({ headers: true }))
//   .pipe(csv.format<IRush, IRushTransformed>({ headers: true }))
//   .transform(async (data, next) => {
//     const users = await pb.collection("pisciner").getFullList({
//       filter: "is_pisciner=true",
//       sort: "login",
//     });
//     const payload = {
//       TeamMembers: data["Team Members"],
//       level: data.level,
//       Pass: data.Pass === "OK" ? "OK" : "KO",
//       Comments: data["Evaluator Comments on each member"],
//     };
//     if (data.Pass !== "") {
//       console.log("RUSH00", payload);
//       await pb.collection("rush").create({
//         pisciner: users.find((user) => user.login === payload.TeamMembers)?.id,
//         project: "RUSH00",
//         comment: payload.Comments,
//         flag: payload.Pass,
//       });
//     }
//     return next(null, payload);
//   });

// fs.createReadStream("./data/rush01.csv")
//   .pipe(csv.parse({ headers: true }))
//   .pipe(csv.format<IRush, IRushTransformed>({ headers: true }))
//   .transform(async (data, next) => {
//     const users = await pb.collection("pisciner").getFullList({
//       filter: "is_pisciner=true",
//       sort: "login",
//     });
//     const payload = {
//       TeamMembers: data["Team Members"],
//       level: data.level,
//       Pass: data.Pass,
//       Comments: data["Evaluator Comments on each member"],
//     };
//     if (data.Pass !== "") {
//       console.log("RUSH01", payload);
//       await pb.collection("rush").create({
//         pisciner: users.find((user) => user.login === payload.TeamMembers)?.id,
//         project: "RUSH01",
//         comment: payload.Comments,
//         flag: payload.Pass,
//       });
//     }
//     return next(null, payload);
//   });

// fs.createReadStream("./data/rush02.csv")
//   .pipe(csv.parse({ headers: true }))
//   .pipe(csv.format<IRush, IRushTransformed>({ headers: true }))
//   .transform(async (data, next) => {
//     const users = await pb.collection("pisciner").getFullList({
//       filter: "is_pisciner=true",
//       sort: "login",
//     });
//     const payload = {
//       TeamMembers: data["Team Members"],
//       level: data.level,
//       Pass: data.Pass,
//       Comments: data["Evaluator Comments on each member"],
//     };
//     if (data.Pass !== "") {
//       console.log("RUSH02", payload);
//       await pb.collection("rush").create({
//         pisciner: users.find((user) => user.login === payload.TeamMembers)?.id,
//         project: "RUSH02",
//         comment: payload.Comments,
//         flag: payload.Pass,
//       });
//     }
//     return next(null, payload);
//   });
