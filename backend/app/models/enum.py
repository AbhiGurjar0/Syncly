import enum

class TaskStatus(str, enum.Enum):
    todo        = "todo"
    in_progress = "in_progress"
    done        = "done"
    blocked     = "blocked"

class MeetingStatus(str, enum.Enum):
    upcoming  = "upcoming"
    running   = "running"
    completed = "completed"

class ProjectStatus(str, enum.Enum):
    on_track = "on_track"
    at_risk  = "at_risk"
    danger   = "danger"
    done     = "done"

class TaskPriority(str, enum.Enum):
    low    = "low"
    medium = "medium"
    high   = "high"
