# SBA 308: Course Learner Data Processing

This script processes course assignments, learner submissions, and calculates weighted averages based on assignment scores. It accounts for various conditions like late submissions, assignment due dates, and data validation to ensure accurate results.

## Features

1. **Course Information Validation**: Verifies if the assignment group belongs to the correct course.
2. **Assignment Validation**: Ensures that assignments have valid `points_possible` and non-zero values.
3. **Assignment Due Dates**: Filters out assignments that are not yet due.
4. **Late Submission Handling**: Deducts 10% from the score if the submission is late.
5. **Weighted Average Calculation**: Computes the weighted average score based on the assignment group's weight and the learner's score.

## Functions

### `assgGroupMismatch(AssgCourse, courseId)`
Checks if the provided assignment group belongs to the course specified by `courseId`.

- **Parameters**:
  - `AssgCourse`: Assignment group object, containing `course_id`.
  - `courseId`: Course object, containing `id`.
- **Returns**: Throws an error if `AssgCourse.course_id` does not match `courseId.id`.

### `assgPointNull(AssgGroup)`
Validates the `points_possible` property of each assignment in the assignment group.

- **Parameters**:
  - `AssgGroup`: Assignment group object, containing an array of assignments.
- **Returns**: Throws an error if any assignment has invalid or zero `points_possible`.

### `dueDateAssignment(assignments)`
Filters assignments based on whether their due date has passed.

- **Parameters**:
  - `assignments`: An array of assignment objects, each containing a `due_at` field.
- **Returns**: An array of assignments that are already due.

### `lateSubmission(assignments, submissions)`
Adjusts learner scores for assignments considering late submissions.

- **Parameters**:
  - `assignments`: An array of assignment objects, each containing a `due_at` field.
  - `submissions`: An array of submission objects, each containing a `submitted_at` field and a `score`.
- **Returns**: An object mapping assignment IDs to adjusted scores.

### `calculateWeightedAverage(scores, assignments)`
Calculates the weighted average for all assignments based on scores and points possible.

- **Parameters**:
  - `scores`: An object containing learner scores mapped by assignment ID.
  - `assignments`: An array of assignment objects, each containing `points_possible` and `group_weight` properties.
- **Returns**: The calculated weighted average score as a percentage.

### `getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)`
Processes learner data, handling validation, filtering, late submissions, and calculating weighted averages.

- **Parameters**:
  - `CourseInfo`: The course object containing `id` and `name`.
  - `AssignmentGroup`: The assignment group object containing `course_id`, `group_weight`, and a list of assignments.
  - `LearnerSubmissions`: An array of learner submissions, each containing `learner_id`, `assignment_id`, and `submission` (with `submitted_at` and `score`).
- **Returns**: An array of objects containing the assignment ID, weighted average, and scores for each learner.

## Example Usage

```javascript
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
    { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
    { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
  ]
};

const LearnerSubmissions = [
  { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
  { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
  { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
  { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
  { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
];

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
