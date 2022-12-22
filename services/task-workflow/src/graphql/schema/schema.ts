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

  """
  Input type to create a new Task.
  """
  input CreateTaskInput {
    name: String!
    description: String!
    comment: String
  }

  """
  Input type to Change the Task state.
  """
  input MoveTaskStateInput {
    id: String!
    comment: String
  }

  type Query {
    """
    Query all tasks
    """
    tasks: [Task]
  }

  type Mutation {
    """
    Create a new Task.
    """
    createTask(input: CreateTaskInput!): Task!
    """
    Move an existing Task to InProgress state.
    """
    moveTaskToInProgress(input: MoveTaskStateInput!): Task!
    """
    Move an existing Task to Completed state.
    """
    moveTaskToCompleted(input: MoveTaskStateInput!): Task!
    """
    Move an existing Task to Abandoned state.
    """
    moveTaskToAbandoned(input: MoveTaskStateInput!): Task!
    """
    Move an existing Task to Paused state.
    """
    moveTaskToPaused(input: MoveTaskStateInput!): Task!
  }
`;
