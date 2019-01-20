import { ViewTasks } from './project_manager_view_tasks.model';

export class ViewProjectTasks {
  projectId: number;
  projectName: string;
  projectStartDate: Date;
  projectEndDate: Date;
  userId: number;
  priority: number;
  statusId: number;
  tasks: ViewTasks[];
}
