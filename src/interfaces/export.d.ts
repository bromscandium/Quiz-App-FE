import { ExportTypes } from '@enums/exportTypes';

export interface ExportMyResultsParams {
  quiz_id?: string;
  export_type: ExportTypes;
}

export interface ExportCompanyUserParams {
  company_id: string;
  user_id: string;
  quiz_id?: string;
  export_type: ExportTypes;
}

export interface ExportCompanyAllParams {
  company_id: string;
  quiz_id?: string;
  export_type: ExportTypes;
}

export interface ExportCompanyQuizParams {
  company_id: string;
  quiz_id: string;
  export_type: ExportTypes;
}
