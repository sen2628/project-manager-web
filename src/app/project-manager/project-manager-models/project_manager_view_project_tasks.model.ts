import { ViewTasks } from './project_manager_view_tasks.model';

export class ViewProjectTasks {
  projectId: number;
  projectName: string;
  projectStartDate: string;
  projectEndDate: string;
  userId: number;
  priority: number;
  status: string;
  completeTasks: number;
  totalTasks: number;
}
