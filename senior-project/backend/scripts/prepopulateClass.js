//imports
const mongoose = require('mongoose');
const Class = require('../models/Class');

//Prepopulate data with schema
async function populateClasses() {
  try {
    const classData = [
	{
		ClassCodename : "GEEN",
		ClassID : 111,
		ClassName : "College of Engineering Colloquium",
		ClassDescription : "This course provides the students with exposure to current issues in computer science.",
		ClassCredits : 1,
		ClassPrerequisite : "Freshman",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 120,
		ClassName : "Computers and Their Use",
		ClassDescription : "This Course provides a survey of the basic principles of computer hardware, computer communications, application software, operating systems, security, impact on society, use in organizations and systems development.",
		ClassCredits : 3,
		ClassPrerequisite : "None",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 121,
		ClassName : "Computer Science Freshmen Colloquium",
		ClassDescription : "This course includes lectures, seminars and activities important to the retention and matriculation of computer science students.",
		ClassCredits : 1,
		ClassPrerequisite : "None",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 160,
		ClassName : "Computer Program in C++ for Engineers",
		ClassDescription : "This is an introductory course in C++ computer programming for engineering students.",
		ClassCredits : 2,
		ClassPrerequisite : "None",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 163,
		ClassName : "Introduction to Computer Programming",
		ClassDescription : "This is an introductory course in computer programming.",
		ClassCredits : 3,
		ClassPrerequisite : "None",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 167,
		ClassName : "Computer Program Design",
		ClassDescription : "This is a second course in computer programming for students with an interest in computers.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP163",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 170,
		ClassName : "Introduction to Web Engineering",
		ClassDescription : "This course introduces basic web development using HTML and client-side and server-side scripting.",
		ClassCredits : 4,
		ClassPrerequisite : "None",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 180,
		ClassName : "Discrete Structures",
		ClassDescription : "Students will be introduced to formal systems, including propositional and predicate logic, that can be used to reason about computer algorithms.",
		ClassCredits : 3,
		ClassPrerequisite : "MATH110",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 200,
		ClassName : "Computer Science Sophomore Colloquium",
		ClassDescription : "This course provides the students with exposure to current issues in computer science.",
		ClassCredits : 1,
		ClassPrerequisite : "Sophomore",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 267,
		ClassName : "Database Design",
		ClassDescription : "This course focuses on logical and physical organizations of sets of related data.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 280,
		ClassName : "Data Structures",
		ClassDescription : "This is the third course in the computer science sequence.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP167",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 285,
		ClassName : "Design and Analysis of Computer Science",
		ClassDescription : "This course covers analysis of efficient algorithms for sorting, searching, dynamic structure manipulation, path finding, fast multiplication, and other problems.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 300,
		ClassName : "Computer Junior Colloquium",
		ClassDescription : "This course provides the students with exposure to current issues in computer science.",
		ClassCredits : 1,
		ClassPrerequisite : "Junior",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 320,
		ClassName : "Fundamentals of Information Assurance",
		ClassDescription : "This course covers concepts in computer network and information security.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 321,
		ClassName : "Computer System Security",
		ClassDescription : "This course introduces the principles of information systems security and examines security policies, models, mechanisms for secrecy, integrity, availability and access controls.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 322,
		ClassName : "Internet Systems",
		ClassDescription : "This course addresses the structure and functionality of the Internet and software that exploits it.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 323,
		ClassName : "Introduction to Health Care Information Systems",
		ClassDescription : "This course introduces broad aspects of health care information systems.",
		ClassCredits : 3,
		ClassPrerequisite : "Junior",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 340,
		ClassName : "Game Intelligence",
		ClassDescription : "This course provides an overview of concepts used in game intelligence.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 350,
		ClassName : "Operating Systems",
		ClassDescription : "This is and introduction to the theory and practice of operating system design and implementation.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 356,
		ClassName : "Computational Hip-Hop and Object-Oriented Design",
		ClassDescription : "This course introduces students to the fundamentals of the Unified Modeling Language (UML) from a Hip-Hop perspective.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP163",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 360,
		ClassName : "Programming Languages",
		ClassDescription : "This course focuses on formal specification of programming languages, including definition of syntax and semantics.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 363,
		ClassName : "Object Oriented Programming",
		ClassDescription : "This is a course in object oriented program development.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 365,
		ClassName : "Artificial Intelligence & Machine Learning",
		ClassDescription : "This course discusses the theory and applications of artificial intelligence with a focus on machine learning.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 368,
		ClassName : "Object-Oriented Software Development",
		ClassDescription : "This course studies object-oriented software development.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 375,
		ClassName : "Computer Architecture and Organization",
		ClassDescription : "This course explores the design of computer systems and their architectures.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 385,
		ClassName : "Theory of Computing",
		ClassDescription : "This course is the study of topics, which include theory of finite state machine and automata.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP360",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 390,
		ClassName : "Social Implications of Computing",
		ClassDescription : "This course examines the increasingly complex interaction between computer systems, our social fabric and ethics.",
		ClassCredits : 3,
		ClassPrerequisite : "None",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 397,
		ClassName : "Co-operative Industrial Experience I",
		ClassDescription : "This is a supervised learning experience in an approved private or government facility.",
		ClassCredits : 3,
		ClassPrerequisite : "Permission of Instructor",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 410,
		ClassName : "Software Engineering",
		ClassDescription : "This course is an introduction to the principles underlying software specification, implementation, validation, and management.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 411,
		ClassName : "Introduction to System Testing and Evaluation",
		ClassDescription : "This course is an introduction to methods, techniques and procedures for system testing and evaluation.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP410",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 420,
		ClassName : "Applied Network Security",
		ClassDescription : "This course covers network security concepts and various network security practices and solutions.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 421,
		ClassName : "Security Management for Information Systems",
		ClassDescription : "This course covers in-depth examination of topics in the management of information systems security including access control systems & methodology.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 440,
		ClassName : "Game Design",
		ClassDescription : "This course will provide an introduction to current techniques used in game design",
		ClassCredits : 3,
		ClassPrerequisite : "COMP340",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 452,
		ClassName : "Network Science",
		ClassDescription : "This course considers empirical aspects of various kinds of networks, formal modeling and analysis of networks, and epecially computational modeling and analysis.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 453,
		ClassName : "Introduction to Computer Graphics",
		ClassDescription : "This is an introductory course in fundamental principles and method in the design, use, and understanding of computer graphic systems.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 463,
		ClassName : "Introduction to Compiler Design",
		ClassDescription : "This course gives an introduction to the theoretical and practical aspect of constructing compilers for computer programming languages.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 468,
		ClassName : "Introduction to Data Mining",
		ClassDescription : "This course introduces the modern computer application of data mining. The theory of data mining is presented as well as applications of its principles in industry.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 469,
		ClassName : "Introduction to Parallel Programming",
		ClassDescription : "This course provides an introduction to parallel programming and problem solving.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP350",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 476,
		ClassName : "Networked Computer Systems",
		ClassDescription : "This course presents an overview of the technology, architecture and software used by systems of network-connected computers.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP280",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 485,
		ClassName : "Special Topics in Computer Science",
		ClassDescription : "This course permits the exploration of advanced topics pertinent to student’s program of study in a seminar setting.",
		ClassCredits : 3,
		ClassPrerequisite : "Freshman",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 494,
		ClassName : "Independent Study",
		ClassDescription : "This course can be used for study of advanced topics in computer science pertinent to the student’s interest under supervision of a faculty member.",
		ClassCredits : 3,
		ClassPrerequisite : "Permission of Instructor",
		ClassCorequisite : "None",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 495,
		ClassName : "Senior Project I",
		ClassDescription : "This course is the first course in a two-semester sequence, which allows students the opportunity to design and implement a software project from start to finish.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP285",
		ClassCorequisite : "COMP410",
		Department : "Computer science"
	},
	{
		ClassCodename : "COMP",
		ClassID : 496,
		ClassName : "Senior Project II",
		ClassDescription : "This course allows students the opportunity to design and implement a software project from start to finish.",
		ClassCredits : 3,
		ClassPrerequisite : "COMP410",
		ClassCorequisite : "None",
		Department : "Computer science"
	}
];
    
    await Class.insertMany(classData);
    console.log('Class data inserted successfully');
  } catch (error) {
    console.error('Error inserting class data:', error);
  }
}

// Run the populateClasses function when this script is executed directly
if (require.main === module) {
  populateClassees();
}

module.exports = populateClasses;
