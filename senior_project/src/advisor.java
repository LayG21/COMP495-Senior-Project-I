public class advisor{
    public String title;
    public String firstName;
    public String lastName;
    public String email;
    public String department;

    public advisor(String title, String firstName, String lastName, String email, String department){
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setDepartment(String department){
        this.department = department;
    }

    public String getTitle(){
        return title;
    }

    public String getFirstName(){
        return firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public String getEmail(){
        return email;
    }

    public String getDepartment(){
        return department;
    }

    public String toString(){
        String result = " ";

        result = "Title:"+"\n"+title+"\n"+"First name:"+"\n"+firstName+"\n"+"Last name:"+"\n"+"Email:"+"\n"+email+"\n"
        +"Department:"+"\n"+department;

        return result;
    }


}