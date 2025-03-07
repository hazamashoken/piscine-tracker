import "dotenv/config";
import * as fs from "fs";

import csv from "fast-csv";

import { pb } from "./src/lib/pocketbase.js";
import type { PbVox } from "./src/lib/type.js";
import { logger } from "./src/logger.js";
import { db } from "./src/lib/drizzle.js";
import { voxTable, voxVoterTable } from "./src/schema/pisciner.js";
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

const processCSV = async (filePath: string, voxNo: string) => {
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

      if (voxNo === "vox1") {
        batch.collection("vox").upsert({
          id: payload.CandidateLogin,
          pisciner: users.find((user) => user.login === payload.CandidateLogin)!
            .id,
          vox1: payload.NumberOfVotes,
          vox1_vote: voteFrom,
        });
      } else if (voxNo === "vox2") {
        batch.collection("vox").upsert({
          id: payload.CandidateLogin,
          pisciner: users.find((user) => user.login === payload.CandidateLogin)!
            .id,
          vox2: payload.NumberOfVotes,
          vox2_vote: voteFrom,
        });
      }

      try {
        await batch.send();
      } catch (error) {
        logger.error(error);
      }

      return next(null, payload);
    });
};

// Process both CSV files
// processCSV("./data/vox1.csv", "vox1");
// processCSV("./data/vox2.csv", "vox2");

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

async function migrateVox() {
  const voxs = await pb.collection("vox").getFullList<PbVox>();
  for (const vox of voxs) {
    try {
      const voxPayload = {
        id: vox.id,
        pisciner: +vox.pisciner,
        vox1: vox.vox1,
        vox2: vox.vox2,
      };
      await db
        .insert(voxTable)
        .values(voxPayload)
        .onConflictDoUpdate({
          target: voxTable.id,
          set: {
            vox1: vox.vox1,
            vox2: vox.vox2,
          },
        });

      try {
        for (const voter of vox.vox1_vote) {
          const payload = {
            voxNo: "vox1",
            pisciner: +voter,
            vox: vox.id,
          };
          logger.info(payload);
          await db.insert(voxVoterTable).values(payload).onConflictDoNothing();
        }
        for (const voter of vox.vox2_vote) {
          const payload = {
            voxNo: "vox2",
            pisciner: +voter,
            vox: vox.id,
          };
          logger.info(payload);
          await db.insert(voxVoterTable).values(payload).onConflictDoNothing();
        }
      } catch (error) {
        logger.error(error);
      }
    } catch (error) {
      logger.error(error);
    }
  }
}

await migrateVox();
