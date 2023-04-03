import java.util.ArrayList;

public class system{
    public static void main(String[] agrs){
       classes geen111 = new classes("College of Engineering Colloquium", "This course provides the students with exposure to current issues in computer science. Colloquium speakers shall include visitors and faculty",
       "GEEN", 111, 1, "Freshmen", null);
       classes comp163 = new classes("Introduction to Computer Programming", "This is an introductory course in computer programming. Problem solving techniques and writing algorithms will be stressed. Students will write programs for such tasks as engineering decision-making and numerical computation.",
       "COMP", 163, 3, null, null);
       classes comp167 = new classes("Computer Program Design", "This is a second course in computer programming for students with an interest in computers. Students will learn to write programs in a high level programming language",
       "COMP", 167, 3, "comp163", null);
       classes comp280 = new classes("Data Structures", "This is the third course in the computer science sequence. It introduces abstractions and programming tools",
       "COMP", 280, 3, "comp167", null);
       ArrayList<classes> computerSc = new ArrayList<classes>();
       ArrayList<classes> cl = new ArrayList<classes>();
       cl.add(comp163);
       cl.add(comp167);
       cl.add(comp280);

       computerSc.add(geen111);
       computerSc.add(comp163);
       computerSc.add(comp167);
       computerSc.add(comp280);

       student std = new student("John", "Doe", "jd@aggies.ncat.edu", 950409687, "Part-time", "Freshman", 3.5, cl);
       advisor adv = new advisor("Professor", "Jane", "Doe", "janed@aggies.edu", "computer science");
       curriculum compSc = new curriculum("ComputerScience",computerSc);

       

       System.out.println(compSc.toString());
       System.out.println();
       System.out.println(std.toString());
       System.out.println();
       System.out.println(adv.toString());
    }
}