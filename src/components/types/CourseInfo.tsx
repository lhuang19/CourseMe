/**
 * 
 * CourseInfo type
 * 
 */

type CourseInfo = {
  key: string;
  id: string;
  dept: string;
  number: number;
  title: string;
  selected: boolean;
  prereqs: Array<string>;
  add: (id: string) => void;
  delete: (id: string) => void;
  description: string;
  showDescription: (id: string) => void;
};

export default CourseInfo;
