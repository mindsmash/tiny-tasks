/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  attachment_data: Uint8Array;
  attachment_name: String;
  attachment_type: String;
}
