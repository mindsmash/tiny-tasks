import { TaskList } from 'app/tasks/task';

export class DataHelper {

  /**
   * set new data array to specific status data field
   * @param taskList list of all tasks
   * @param container status id and new data
   * @returns list of all tasks
   */
    public static setTaskListData(taskList: TaskList[], container): TaskList[] {
        const dataIndex = taskList.findIndex(x => x.id === container.id);
        if (dataIndex !== -1) {
          taskList[dataIndex].data = container.data;
        }
        return taskList;
      }
}
