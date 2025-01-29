// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
];
  
  
  
// ==========================================================================================================================
  
  //*TODO: Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.
  
// ========================================================================================================================
//        ----------------------------------------------Step 1-----------------------------------------------------
//* If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.

function assgGroupMismatch(AssgCourse, courseId){
  if (AssgCourse.course_id !== courseId.id) {
    throw new Error(`Input Not valid! The AssignmentGroup ${AssgCourse.course_id} does not belong to the Course ${courseId.id}! Please Try Again!`)
  }
  return courseId.id
}

// Test the function
try {
  const groupMismatch = assgGroupMismatch({course_id: 123}, {id: 456});
  console.log(groupMismatch);
} catch (e) {
  console.error(e);
}
// console.log(assgGroupMismatch(AssignmentGroup, CourseInfo));



// ========================================================================================================================
//        ----------------------------------------------Step 2-----------------------------------------------------
//* You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 

function assgPointNull (AssgGroup) {
  AssgGroup.assignments.forEach(assignment => {
    // Check if points_possible is 0
    if (assignment.points_possible === 0) {
      throw new Error (`Invalid Data! In AssignmentGroup, The Assignment ${assignment.id} has a possible points of 0!`)
    } else if (!(Number(assignment.points_possible))){
      throw new Error(`Invalid Data! In AssignmentGroup, The Assignment ${assignment.id} does not have a Number in the possible points!`)
    }
  });
  // If no error is thrown, return success message
  return "All assignments have valid points!";
}

// Test the function
try {
  const AssignmentGroup = {
    assignments: [
      {id: 1, points_possible: 150},
      {id: 2, points_possible: "zero"}, // This will trigger an error
      {id: 3, points_possible: 0}, // This will trigger an error, but is not gonna show unless you comment line 128, or move it to the bottom.
    ],
  };
  let pointNull = assgPointNull(AssignmentGroup);
  console.log(pointNull); // Will not execute if an error is thrown
} catch (e) {
  console.error(e); // Log the error message
}


// ========================================================================================================================
//        ----------------------------------------------Step 3-----------------------------------------------------
//* If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
function dueDateAssignment(assignments) {
  let todaysDate = new Date (); // 
  console.log(todaysDate);
  
  const validDueDates = assignments.filter(assignment => new Date(assignment.due_at) < todaysDate);
  return validDueDates;
}

let dueAssignments = dueDateAssignment(AssignmentGroup.assignments)
console.log("These are the assignments that are already due: ", dueAssignments);

// ==========================================================================================================================
//        ----------------------------------------------Step 4-----------------------------------------------------

function lateSubmission(assignments, submissions) {
  let scores = {};
  
  assignments.forEach((assignment, index) => {
    const submission = submissions[index]; // Pair each assignment with its submission
    
    // Check if submission exists
    if (!submission) {
      console.log(`No submission found for assignment ${assignment.id}`);
      return;
    }
    
    if (new Date(assignment.due_at) < new Date(submission.submitted_at)) {
      // Late submission: deduct 10%
      scores[assignment.id] = submission.score * 0.9;
      console.log(
        `Assignment ${assignment.id}: Late. Adjusted score: ${scores[assignment.id]}`
      );
    } else {
      // On-time submission: full score
      scores[assignment.id] = submission.score;
      console.log(
        `Assignment ${assignment.id}: On time. Score: ${scores[assignment.id]}`
      );
    }
  });
  
  // Return the scores object instead of a specific assignment
  return scores;
}

// Example usage:
const assignments = [
  { id: 1, due_at: "2025-01-20T23:59:59Z" },
  { id: 2, due_at: "2025-01-22T23:59:59Z" },
];

const submissions = [
  { id: 1, submitted_at: "2025-01-21T12:00:00Z", score: 100 },
  { id: 2, submitted_at: "2025-01-22T22:00:00Z", score: 95 },
];

const finalScores = lateSubmission(assignments, submissions);
console.log(finalScores);




// ============================================================================================================================
//        ----------------------------------------------Step 5-----------------------------------------------------
//* Calculate Weighted Average: Use group_weight and points_possible to calculate a weighted average for all assignments.
function calculateWeightedAverage(scores, assignmts){
    // Initialize variables to store the total possible points and total weighted score
  let totalPoints = 0;
  let weightedScore = 0;

    // Iterate over the assignments array
  for (let i = 0; i < assignmts.length; i++){
    const assignment = assignmts[i]; // Get the current assignment object

    // Skip this iteration if the score for the assignment is undefined
    if (scores[assignment.id] === undefined) {
      console.log(`Skipping assignment ${assignment.id} as no score is recorded.`);
      continue; // Skip to the next assignment
    }

    // Stop the loop if a specific condition is met (e.g., totalPoints exceeds a threshold)
    if (totalPoints > 1000) {
      console.log("Total points exceeded the threshold. Breaking the Loop!");
      break; // Exit the loop
    }

    // Add the assignment's possible points to the total points
    totalPoints += assignment.points_possible;

    // Calculate the weighted score for the assignment and add it to the total weighted score  
    weightedScore += (scores[assignment.id] / 100) * assignment.points_possible;

    // Log the current assignment's details for debugging
    console.log(
      `Processed assignment ${assignment.id}: 
      points_possible = ${assignment.points_possible}, 
      weighted_score = ${weightedScore}`
    );
  }

  // Calculate the final weighted average as a percentage
  const weightedAverage = (weightedScore / totalPoints) * 100;

  // Log the final weighted average
  console.log(`The Total-Weighted-Average is: ${weightedAverage}`);

  // Return the weighted average
  return weightedAverage;
}

// Here is an example to test our code
// An object containing scores for each assignment (keyed by assignment ID)
const scores = {
  1: 85, // 85% scored on assignment 1
  2:90, // 90% scored on assignment 2
  3: undefined, // No score recorded for assignment 3
  4:79, // 79% scored on assignment 4
};

// An array of assignments with their IDs, points possible, and group weights
const assignmts = [
  {id: 1, points_possible: 100, group_weight: 0.3}, // Assignment 1
  {id: 2, points_possible: 150, group_weight: 0.4}, // Assignment 2
  {id: 3, points_possible: 200, group_weight: 0.3}, // Assignment 3: No score recorded
  {id: 4, points_possible: 50, group_weight: 0.2}, // Assignment 4
];

// Call the function with the example data
console.log(calculateWeightedAverage(scores, assignmts));







function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  // Step 1: Check if the Assignment Group belongs to the correct Course
  // If the course_id of the AssignmentGroup does not match CourseInfo.id, throw an error
  try{
    assgGroupMismatch(AssignmentGroup, CourseInfo);
  }catch (error) {
    console.log(error);
    return; // Exit the function if validation fails
  }

  // Step 2: Validate Points in Assignments
  // Ensure all assignments have valid points_possible values (non-zero and numeric)
  try {
    assgPointNull (AssignmentGroup);
    console.log(AssignmentGroup);
  } catch (error) {
    console.log(error);
    return; // Exit the function if validation fails
  }

  // Step 3: Filter Out Assignments Not Yet Due
  // Keep only the assignments whose due dates have already passed, so we can calculate scores only for past assignments
  const validAssignments = dueDateAssignment(AssignmentGroup.assignments); // Filter assignments based on due date
  
  
  // Step 4: Handle Late Submissions: Deduct 10% from scores for late submissions
  // This step will calculate the final scores for each assignment after considering late submission penalties
  const scores = lateSubmission(validAssignments, LearnerSubmissions);  // Calculate scores considering late penalties


  // Step 5: Format the Result
  // Result will contain assignment details, individual learner scores, and weighted averages for each assignment
  let result = [];  // Initialize an empty array to hold the final results

  // Extract unique learner IDs from the learner submissions
  const learners = LearnerSubmissions.map(sub => sub.learner_id)  // Get all learner IDs
    .filter((learner_id, index, self) => self.indexOf(learner_id) === index);  // Remove duplicate learner IDs

  // Iterate through each unique learner to calculate their scores for each assignment
  learners.forEach(learnerId => {
    // Step 6: Create a map of scores for the current learner from their submissions
    let learnerScores = LearnerSubmissions.filter(sub => sub.learner_id === learnerId)  // Filter submissions for this learner
      .reduce((acc, sub) => {
        acc[sub.assignment_id] = sub.submission.score;  // Map assignment IDs to scores
        return acc;  // Return the accumulated object
      }, {});  // Initialize the accumulator as an empty object

    // Step 7: For each valid assignment, calculate the individual learner's score and apply the late penalty
    validAssignments.forEach(assignment => {
      // Initialize an object to store the scores for this assignment
      const assignmentScores = {};  
      let totalScore = 0;  // Initialize the total score for this assignment
      let totalPoints = 0;  // Initialize the total possible points for the assignment

      // Iterate through the learner submissions to get scores for this assignment
      LearnerSubmissions.forEach(submission => {
        if (submission.assignment_id === assignment.id) {  // If this submission is for the current assignment
          let score = submission.submission.score;  // Get the original score
          
          // Apply late submission penalty if the submission is late
          if (new Date(assignment.due_at) < new Date(submission.submission.submitted_at)) {
            score *= 0.9;  // Deduct 10% for late submission
          }

          // Store the adjusted score for this learner in the assignmentScores object
          assignmentScores[submission.learner_id] = score;

          // Accumulate the total score and total possible points
          totalScore += score;  
          totalPoints += assignment.points_possible;  
        }
      });

      // Step 8: Calculate the weighted average for the assignment
      const weightedAverageForAssignment = (totalScore / totalPoints) * 100;  // Calculate weighted average for this assignment

      // Push the assignment details along with the learner scores and weighted average to the result array
      result.push({
        id: assignment.id,  // Assignment ID
        avg: Math.round(weightedAverageForAssignment),  // Round the weighted average for the assignment
        ...assignmentScores  // Spread the assignmentScores object to include scores for each learner
      });
    });
  });

  // Return the final result containing all the assignment scores and weighted averages
  return result;
}

// Example call to the function with CourseInfo, AssignmentGroup, and LearnerSubmissions
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// Log the final result for verification
console.log(result);


// Defining the test data for the course, assignment group, and submissions

// Course Data: Contains information about the course
const course = { id: 1, name: "Math 101" };

// Assignment Group Data: Contains assignments under a specific group within the course
const group = {
  id: 1,
  name: "Homework",
  course_id: 1,
  group_weight: 20,
  assignments: [
    { id: 1, name: "Assignment 1", due_at: "2025-01-01", points_possible: 100 },
    { id: 2, name: "Assignment 2", due_at: "2025-02-01", points_possible: 50 }
  ]
};

// Submissions Data: Contains submission details from learners for each assignment
const learSubmissions = [
  { learner_id: 1, assignment_id: 1, submission: { submitted_at: "2025-01-02", score: 90 } },
  { learner_id: 1, assignment_id: 2, submission: { submitted_at: "2025-01-31", score: 40 } }
];

// Call the function `getLearnerData` with the course, assignment group, and learSubmissions as arguments
// This function will process the data and return the learner scores and weighted averages
const results = getLearnerData(course, group, learSubmissions);

// Log the result for verification
console.log(results);



// here, we would process this data to achieve the desired result.
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];

// return result;