/**
 * StudyOnd Mock Data — Type Reference
 *
 * This file defines every entity and enum used across the mock-data JSON files.
 */

// -- Enums --
export type Degree = "bsc" | "msc" | "phd";
export type TopicEmployment = "yes" | "no" | "open";
export type TopicEmploymentType = "internship" | "working_student" | "graduate_program" | "direct_entry";
export type TopicWorkplaceType = "on_site" | "hybrid" | "remote";
export type TopicType = "topic" | "job";
export type ProjectState = "proposed" | "applied" | "withdrawn" | "rejected" | "agreed" | "in_progress" | "canceled" | "completed";
export type StudentObjective = "topic" | "supervision" | "career_start" | "industry_access" | "project_guidance";
export type ExpertObjective = "recruiting" | "fresh_insights" | "research_collaboration" | "education_collaboration" | "brand_visibility";
export type SupervisorObjective = "student_matching" | "research_collaboration" | "network_expansion" | "funding_access" | "project_management";

// -- Entities --
export interface University {
  id: string;
  name: string;
  country: string;
  domains: string[];           // email domains, e.g. ["unisg.ch"]
  about: string | null;        // description of the university, useful for matching context
}

export interface StudyProgram {
  id: string;
  name: string;                // e.g. "MSc Computer Science"
  degree: Degree;
  universityId: string;
  about: string | null;        // description of the program, useful for matching context
}

export interface Field {
  id: string;
  name: string;                // e.g. "Data Science", "Supply Chain Management"
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  degree: Degree;
  studyProgramId: string;
  universityId: string;
  skills: string[];             // e.g. ["Python", "data analysis", "machine learning"]
  about: string | null;        // LinkedIn-style bio, ~2/3 filled
  objectives: StudentObjective[];
  fieldIds: string[];
}

export interface Supervisor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;               // e.g. "Prof. Dr."
  universityId: string;
  researchInterests: string[];  // e.g. ["NLP", "knowledge graphs", "information retrieval"]
  about: string | null;        // LinkedIn-style bio, ~2/3 filled
  objectives: SupervisorObjective[];
  fieldIds: string[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  about: string | null;        // longer context about thesis collaboration, useful for matching
  size: string;                // e.g. "1-50", "51-200", "1000+"
  domains: string[];           // industry sectors
}

export interface Expert {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;               // role at company
  companyId: string;
  offerInterviews: boolean;
  about: string | null;        // LinkedIn-style bio, ~2/3 filled
  objectives: ExpertObjective[];
  fieldIds: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  type: TopicType;              // "topic" for thesis/research, "job" for employment listings
  employment: TopicEmployment;  // "yes"/"no"/"open" — whether this can lead to a job
  employmentType: TopicEmploymentType | null;  // populated only when employment is "yes" or "open"
  workplaceType: TopicWorkplaceType | null;    // populated only when employment is "yes" or "open"
  degrees: Degree[];
  fieldIds: string[];
  // one or the other, never both
  companyId: string | null;     // set for company topics
  universityId: string | null;  // set for supervisor topics
  supervisorIds: string[];      // supervisor topics: always >=1 (the posting supervisor); company topics: []
  expertIds: string[];          // company topics: 1-2 experts; supervisor topics: []
  // Hydrated fields (optional)
  supervisors?: Supervisor[];
  experts?: Expert[];
  company?: Company | null;
  university?: University | null;
  fields?: Field[];
}

export interface ThesisProject {
  id: string;
  title: string;
  description: string | null;
  motivation: string | null;    // may be null for early-stage projects
  state: ProjectState;
  studentId: string;
  topicId: string | null;       // can be null — project-first model
  companyId: string | null;     // from the topic's company (if any)
  universityId: string | null;  // from the student's university or topic's university; both companyId and universityId can be present
  supervisorIds: string[];
  expertIds: string[];
  createdAt: string;
  updatedAt: string;
}
