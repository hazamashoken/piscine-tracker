export interface PbPisciner {
  collectionId: string;
  collectionName: string;
  id: string;
  login: string;
  email: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  level: number;
  url: string;
  displayname: string;
  kind: string;
  pool_month: string;
  pool_year: string;
  image_url: string;
  is_pisciner: boolean;
  created: Date;
  updated: Date;
}
export interface PbProject {
  collectionId: string;
  collectionName: string;
  id: string;
  name: string;
  slug: string;
  exam: boolean;
  created: Date;
  updated: Date;
}
export interface PbScaleTeam {
  collectionId: string;
  collectionName: string;
  id: string;
  scale_id: string;
  corrector: string;
  corrected: string;
  final_mark: number;
  comment: string;
  feedback: string;
  flag: string;
  created: Date;
  updated: Date;
}
export interface PbTeam {
  collectionId: string;
  collectionName: string;
  id: string;
  users: string[];
  name: string;
  status: string;
  final_mark: number;
  repo_url: string;
  project_name: string;
  project_id: string;
  created: Date;
  updated: Date;
}
export interface PbLocationStat {
  collectionId: string;
  collectionName: string;
  id: string;
  user: string;
  date: Date;
  duration: number;
  created: Date;
  updated: Date;
}
export interface PbLocation {
  collectionId: string;
  collectionName: string;
  id: string;
  begin_at: string;
  end_at: string;
  host: string;
  user: string;
}
