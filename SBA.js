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
//* 
function name(params) {
  
}





function getLearnerData(course, ag, submissions) {






}

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);



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