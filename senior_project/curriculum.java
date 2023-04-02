public class curriculum{
    public String department;
    ArrayList<classes> courses;

    public curriculum(){
        department = null;
        courses = new ArrayList<classes>();
    }

    public curriculum(String department, ArrayList<classes> courses){
        this.department = department;
        this.courses = courses;
    }

    public void setDepartment(String department){
        this.department = department;
    }

    public void setCourses(ArrayList<classes> courses){
        this.courses = courses;
    }

    public void setCourses(int j, classes cl){
        courses.add(j, cl);
    }

    public void addCourses(classes cla){
        courses.add(cla);
    }

    public String getDepartment(){
        return department;
    }

    public ArrayList<classes> getCourses(){
        return courses;
    }

    public classes getCourses(int i){
        return courses.get(i);
    }

    public int getNumCourses(){
        return courses.size();
    }

    public classes removeCourses(int k){
        return courses.remove(k);
    }

    @Override
    public String toString(){
        String result = "";
        result = "Department: "+"\n"+department+"\n";
        for(int i = 0; i < getNumCourses(); i++){
            result += courses.get(i).toString()+"\n";
        }
        return result;
    }


}