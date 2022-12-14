export const taskTypeDefs = `#graphql
  """
  TaskState represents the states a task can have
  """
  enum TaskState {
    Planned
    InProgress
    Completed
    Paused
    Abandoned
  }

  """
  The "Task" type defines the base structure for a task in the application.  
  """
  type Task {
    id: String!
    name: String!
    description: String!
    state: TaskState!
    comment: String
  }

  type Query {
    """
    Query all tasks
    """
    tasks: [Task]
  }
`;
