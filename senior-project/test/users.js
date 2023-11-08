const mockStudents = [
    {
        id: 207,
        firstName: "Linda",
        lastName: "Jones",
        email: "ljones@aggies.ncat.edu",
        password: "linda!",
        advisorId: 101,
    },
    {
        id: 209,
        firstName: "Jane",
        lastName: "Does",
        email: "jdoes@aggies.ncat.edu",
        password: "jdoes2!",
        advisorId: 101,
    },
    {
        id: 310,
        firstName: "Lane",
        lastName: "Austin",
        email: "lane@aggies.ncat.edu",
        password: "lane!",
        advisorId: 102,
    },
];

const mockAdvisors = [
    {
        id: 101,
        departmentName: "Computer Science",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@ncat.edu",
        password: "janesmith1!",
    },
    {
        id: 102,
        departmentName: "Computer Science",
        firstName: "Josh",
        lastName: "Smith",
        email: "josh@ncat.edu",
        password: "joshsmith1!",
    },
];

module.exports = {
    mockStudents,
    mockAdvisors,
};