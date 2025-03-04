import "dotenv/config";
import * as fs from "fs";

import csv from "fast-csv";

import { pb } from "./src/lib/pocketbase.js";
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

// fs.createReadStream("./data/vox1.csv")
//   .pipe(csv.parse({ headers: true }))
//   .pipe(csv.format<IVox, IVoxTransformed>({ headers: true }))
//   .transform(async (data, next) => {
//     const payload = {
//       CandidateLogin: data.CandidateLogin,
//       NumberOfVotes: data.NumberOfVotes,
//       Voters: data.Voters.split(","),
//     };
//     const users = await pb.collection("pisciner").getFullList({
//       filter: "is_pisciner=true",
//       sort: "login",
//     });
//     const batch = pb.createBatch();
//     const voteFrom = payload.Voters.map(
//       (voter) =>
//         users.find((user) => {
//           return user.login === voter.trim().toLocaleLowerCase();
//         })?.id,
//     );
//     batch.collection("vox").upsert({
//       pisciner: users.find((user) => user.login === payload.CandidateLogin)!.id,
//       vox: payload.NumberOfVotes,
//       vote_from: voteFrom,
//     });

//     try {
//       await batch.send();
//     } catch (error) {
//       console.error(error);
//     }
//     return next(null, payload);
//   });

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
