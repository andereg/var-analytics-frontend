import companiesData from '@/mock-data/companies.json';
import expertsData from '@/mock-data/experts.json';
import fieldsData from '@/mock-data/fields.json';
import projectsData from '@/mock-data/projects.json';
import studentsData from '@/mock-data/students.json';
import studyProgramsData from '@/mock-data/study-programs.json';
import supervisorsData from '@/mock-data/supervisors.json';
import topicsData from '@/mock-data/topics.json';
import universitiesData from '@/mock-data/universities.json';

import {
  Company,
  Expert,
  Field,
  ThesisProject,
  Student,
  StudyProgram,
  Supervisor,
  Topic,
  University
} from '@/types/studyond';

// Type assertions to ensure JSON matches our interfaces
export const companies = companiesData as Company[];
export const experts = expertsData as Expert[];
export const fields = fieldsData as Field[];
export const projects = projectsData as ThesisProject[];
export const students = studentsData as Student[];
export const studyPrograms = studyProgramsData as StudyProgram[];
export const supervisors = supervisorsData as Supervisor[];
export const topics = topicsData as Topic[];
export const universities = universitiesData as University[];

// -- Helper Functions --

export const getAllCompanies = () => companies;
export const getCompanyById = (id: string) => companies.find(c => c.id === id);

export const getAllExperts = () => experts;
export const getExpertById = (id: string) => experts.find(e => e.id === id);
export const getExpertsByCompanyId = (companyId: string) => experts.filter(e => e.companyId === companyId);

export const getAllFields = () => fields;
export const getFieldById = (id: string) => fields.find(f => f.id === id);

export const getAllProjects = () => projects;
export const getProjectById = (id: string) => projects.find(p => p.id === id);
export const getProjectsByStudentId = (studentId: string) => projects.filter(p => p.studentId === studentId);

export const getAllStudents = () => students;
export const getStudentById = (id: string) => students.find(s => s.id === id);

export const getAllStudyPrograms = () => studyPrograms;
export const getStudyProgramById = (id: string) => studyPrograms.find(p => p.id === id);
export const getStudyProgramsByUniversityId = (uniId: string) => studyPrograms.filter(p => p.universityId === uniId);

export const getAllSupervisors = () => supervisors;
export const getSupervisorById = (id: string) => supervisors.find(s => s.id === id);
export const getSupervisorsByUniversityId = (uniId: string) => supervisors.filter(s => s.universityId === uniId);

export const getAllTopics = () => topics;
export const getTopicById = (id: string) => topics.find(t => t.id === id);
export const getTopicsByCompanyId = (companyId: string) => topics.filter(t => t.companyId === companyId);
export const getTopicsByUniversityId = (uniId: string) => topics.filter(t => t.universityId === uniId);
export const getTopicsByFieldId = (fieldId: string) => topics.filter(t => t.fieldIds.includes(fieldId));

export const getAllUniversities = () => universities;
export const getUniversityById = (id: string) => universities.find(u => u.id === id);

/**
 * Hydrated Topic: includes Company or University details
 */
export const getHydratedTopic = (id: string) => {
  const topic = getTopicById(id);
  if (!topic) return null;

  return {
    ...topic,
    company: topic.companyId ? getCompanyById(topic.companyId) : null,
    university: topic.universityId ? getUniversityById(topic.universityId) : null,
    experts: topic.expertIds.map(id => getExpertById(id)).filter(Boolean) as Expert[],
    supervisors: topic.supervisorIds.map(id => getSupervisorById(id)).filter(Boolean) as Supervisor[],
    fields: topic.fieldIds.map(id => getFieldById(id)).filter(Boolean) as Field[],
  };
};

/**
 * Hydrated Project: includes all related entities
 */
export const getHydratedProject = (id: string) => {
  const project = getProjectById(id);
  if (!project) return null;

  return {
    ...project,
    student: getStudentById(project.studentId),
    topic: project.topicId ? getTopicById(project.topicId) : null,
    company: project.companyId ? getCompanyById(project.companyId) : null,
    university: project.universityId ? getUniversityById(project.universityId) : null,
    supervisors: project.supervisorIds.map(id => getSupervisorById(id)).filter(Boolean) as Supervisor[],
    experts: project.expertIds.map(id => getExpertById(id)).filter(Boolean) as Expert[],
  };
};
