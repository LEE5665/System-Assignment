interface IdParms {
  params: {
    id: string;
  };
}
interface ProfDetailParms {
  class_id: string;
  class_name: string;
  week: string;
  students: [string, string][];
}
