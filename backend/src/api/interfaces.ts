export interface ScaleTeam {
  id:                     number;
  scale_id:               number;
  comment:                string;
  created_at:             Date;
  updated_at:             Date;
  feedback:               string;
  final_mark:             number;
  flag:                   Flag;
  begin_at:               Date;
  correcteds:             Corrector[];
  corrector:              Corrector;
  truant:                 Truant;
  filled_at:              Date;
  questions_with_answers: QuestionsWithAnswer[];
  scale:                  Scale;
  team:                   Team;
  feedbacks:              Feedback[];
}

export interface Corrector {
  id:    number;
  login: string;
  url:   string;
}

export interface Feedback {
  id:                number;
  user:              Corrector;
  feedbackable_type: string;
  feedbackable_id:   number;
  comment:           string;
  rating:            number;
  created_at:        Date;
}

export interface Flag {
  id:         number;
  name:       string;
  positive:   boolean;
  icon:       string;
  created_at: Date;
  updated_at: Date;
}

export interface QuestionsWithAnswer {
  id:         number;
  name:       string;
  guidelines: string;
  rating:     Rating;
  kind:       Kind;
  position:   number;
  answers:    Answer[];
}

export interface Answer {
  value:  number;
  answer: null;
}

export interface Scale {
  id:                  number;
  evaluation_id:       number;
  name:                string;
  is_primary:          boolean;
  comment:             string;
  introduction_md:     string;
  disclaimer_md:       string;
  guidelines_md:       string;
  created_at:          Date;
  correction_number:   number;
  duration:            number;
  manual_subscription: boolean;
  languages:           Language[];
  flags:               Flag[];
  free:                boolean;
}

export interface Language {
  id:         number;
  name:       string;
  identifier: string;
  created_at: Date;
  updated_at: Date;
}

export interface Team {
  id:                  number;
  name:                string;
  url:                 string;
  final_mark:          number;
  project_id:          number;
  created_at:          Date;
  updated_at:          Date;
  status:              string;
  terminating_at:      Date;
  users:               User[];
  "locked?":           boolean;
  "validated?":        boolean;
  "closed?":           boolean;
  repo_url:            string;
  repo_uuid:           string;
  locked_at:           Date;
  closed_at:           Date;
  project_session_id:  number;
  project_gitlab_path: string;
}

export interface User {
  id:               number;
  login:            string;
  url:              string;
  leader:           boolean;
  occurrence:       number;
  validated:        boolean;
  projects_user_id: number;
}

export interface Truant {
}


export interface User42 {
  id:                number;
  email:             string;
  login:             string;
  first_name:        string;
  last_name:         string;
  usual_full_name:   string;
  usual_first_name:  null;
  url:               string;
  phone:             string;
  displayname:       string;
  kind:              string;
  image:             Image;
  "staff?":          boolean;
  correction_point:  number;
  pool_month:        string;
  pool_year:         string;
  location:          null;
  wallet:            number;
  anonymize_date:    Date;
  data_erasure_date: Date;
  created_at:        Date;
  updated_at:        Date;
  alumnized_at:      null;
  "alumni?":         boolean;
  "active?":         boolean;
  groups:            Group[];
  cursus_users:      CursusUser[];
  projects_users:    any[];
  languages_users:   LanguagesUser[];
  achievements:      Achievement[];
  titles:            any[];
  titles_users:      any[];
  partnerships:      any[];
  patroned:          any[];
  patroning:         any[];
  expertises_users:  any[];
  roles:             Group[];
  campus:            Campus[];
  campus_users:      CampusUser[];
}

export interface Achievement {
  id:             number;
  name:           string;
  description:    string;
  tier:           string;
  kind:           string;
  visible:        boolean;
  image:          string;
  nbr_of_success: null;
  users_url:      string;
}

export interface Campus {
  id:                   number;
  name:                 string;
  time_zone:            string;
  language:             Language;
  users_count:          number;
  vogsphere_id:         number;
  country:              string;
  address:              string;
  zip:                  string;
  city:                 string;
  website:              string;
  facebook:             string;
  twitter:              string;
  active:               boolean;
  public:               boolean;
  email_extension:      string;
  default_hidden_phone: boolean;
}

export interface Language {
  id:         number;
  name:       string;
  identifier: string;
  created_at: Date;
  updated_at: Date;
}

export interface CampusUser {
  id:         number;
  user_id:    number;
  campus_id:  number;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CursusUser {
  id:            number;
  begin_at:      Date;
  end_at:        null;
  grade:         null;
  level:         number;
  skills:        any[];
  cursus_id:     number;
  has_coalition: boolean;
  blackholed_at: null;
  created_at:    Date;
  updated_at:    Date;
  user:          User;
  cursus:        Cursus;
}

export interface Cursus {
  id:         number;
  created_at: Date;
  name:       string;
  slug:       string;
  kind:       string;
}

export interface User {
  id:                number;
  email:             string;
  login:             string;
  first_name:        string;
  last_name:         string;
  usual_full_name:   string;
  usual_first_name:  null;
  url:               string;
  phone:             string;
  displayname:       string;
  kind:              string;
  image:             Image;
  "staff?":          boolean;
  correction_point:  number;
  pool_month:        string;
  pool_year:         string;
  location:          null;
  wallet:            number;
  anonymize_date:    Date;
  data_erasure_date: Date;
  created_at:        Date;
  updated_at:        Date;
  alumnized_at:      null;
  "alumni?":         boolean;
  "active?":         boolean;
}

export interface Image {
  link:     string;
  versions: Versions;
}

export interface Versions {
  large:  string;
  medium: string;
  small:  string;
  micro:  string;
}

export interface Group {
  id:   number;
  name: string;
}

export interface LanguagesUser {
  id:          number;
  language_id: number;
  user_id:     number;
  position:    number;
  created_at:  Date;
}


export interface OneTeam {
  id:                  number;
  name:                string;
  url:                 string;
  final_mark:          number;
  project_id:          number;
  created_at:          Date;
  updated_at:          Date;
  status:              string;
  terminating_at:      Date;
  users:               User[];
  "locked?":           boolean;
  "validated?":        boolean;
  "closed?":           boolean;
  repo_url:            string;
  repo_uuid:           string;
  locked_at:           Date;
  closed_at:           Date;
  project_session_id:  number;
  project_gitlab_path: string;
  scale_teams:         ScaleTeam[];
  teams_uploads:       TeamsUpload[];
}

export interface ScaleTeam {
  id:                     number;
  scale_id:               number;
  comment:                string;
  created_at:             Date;
  updated_at:             Date;
  feedback:               string;
  final_mark:             number;
  flag:                   Flag;
  begin_at:               Date;
  correcteds:             Correct[];
  corrector:              Correct;
  truant:                 Truant;
  filled_at:              Date;
  questions_with_answers: QuestionsWithAnswer[];
}

export interface Correct {
  id:    number;
  login: string;
  url:   string;
}

export interface Flag {
  id:         number;
  name:       string;
  positive:   boolean;
  icon:       string;
  created_at: Date;
  updated_at: Date;
}

export interface QuestionsWithAnswer {
  id:         number;
  name:       string;
  guidelines: string;
  rating:     Rating;
  kind:       Kind;
  position:   number;
  answers:    Answer[];
}

export interface Answer {
  value:  number;
  answer: null;
}

export enum Kind {
  Standard = "standard",
}

export enum Rating {
  Bool = "bool",
}

export interface Truant {
}

export interface TeamsUpload {
  id:         number;
  final_mark: number;
  comment:    string;
  created_at: Date;
  upload_id:  number;
}

export interface User {
  id:               number;
  login:            string;
  url:              string;
  leader:           boolean;
  occurrence:       number;
  validated:        boolean;
  projects_user_id: number;
}
