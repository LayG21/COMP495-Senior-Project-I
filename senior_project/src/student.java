import java.util.ArrayList;

public class student{
    public String firstName;
    public String lastName;
    public String email;
    public float BannerID;
    public String status;
    public String classification;
    public double gpa;
    public ArrayList<classes> classe;

    public student(){
        firstName = null;
        lastName = null;
        email = null;
        BannerID = 0;
        status = null;
        classification = null;
        gpa = 0.0;
        classe = new ArrayList<classes>();
    }

    public student(String firstName, String lastName ,String email, float BannerID, String status, String classification, double gpa, ArrayList<classes> classe ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.BannerID = BannerID;
        this.status = status;
        this.classification = classification;
        this.gpa = gpa;
        this.classe = classe;

    }

    public void setFirstName(String fName){
        this.firstName = fName;
    }

    public void setLastNam(String lName){
        this.lastName = lName;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setBannerID(float Bid){
        this.bannerID = Bid;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public void setClassification(String classification){
        this.classification = classification;
    }

    public void setGpa(double gpa){
        this.gpa = gpa;
    }

    public void setClasse(ArrayList<classes> classe){
        this.classe = classe;
    }

    public void setClasse(int j, classes cl){
        classe.add(j, cl);
    }

    public void addClass(classes cla){
        classe.add(cla);
    }

    public String getFirstName(){
        return firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public float getBannerID(){
        return BannerID;
    }

    public String getStatus(){
        return status;
    }

    public String getClassification(){
        return classification;
    }

    public ArrayList<classes> getClasse(){
        return classe;
    }

    public double getGpa(){
        return gpa;
    }

    public classes getClasse(int i){
        return classe.get(i);
    }

    public int getNumClasse(){
        return classe.size();
    }

    public classes removeClasse(int k){
        return classe.remove(k);
    }
    
    @Override
    public String toString(){
        String result = " ";

        result = "First name:"+"\n" +firstName+"\n"+"Last name:"+"\n"+lastName+"\n"+"Banner ID:"+"\n"+BannerID+"\n"+"Status:"+"\n"+status+"\n"
        +"Classification:"+"\n"+classification+"\n"+"Grade Point Average: "+"\n"+gpa+"\n"+"current classes: "+"\n";
        for(int i = 0; i < getNumClasse(); i++){
            result += classe.get(i).toString()+"\n";
        }

        return result;

    }


}