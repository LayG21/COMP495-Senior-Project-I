public class classes{
    public String name;
    public String description;
    public String codeName;
    public int id;
    public String preRequisite;
    public String CoRequisite;

    public classes(String name, String description, String codeName, int id, String preRequisite, String CoRequisite){
        this.name = name;
        this.description = description;
        this.codeName = codeName;
        this.id = id;
        this.preRequisite = preRequisite;
        this.CoRequisite = CoRequisite;
    }

    public classes(){
        name = null;
        description = null;
        codeName = null;
        id = 0;
        preRequisite = null;
        CoRequisite = null;

    }

    public void setName(String name){
        this.name = name;
    }

    public void setDescription(String description){
        this.description = description;

    }

    public void setCodeName(String codeName){
        this.codeName = codeName;
    }

    public void setID(int id){
        this.id = id;
    }

    public void setPreRequisite(String preRequisite){
        this.preRequisite = preRequisite;
    }

    public void setCoRequisite(String CoRequisite){
        this.CoRequisite = CoRequisite;
    }

    public String getName(){
        return name;
    }

    public String getDescription(){
        return description;
    }

    public String getCodeName(){
        return codeName;
    }

    public int getID(){
        return id;
    }

    public String getPreRequisite(){
        return preRequisite;
    }

    public String getCoRequisite(){
        return CoRequisite;
    }

    public String toString(){
        String res = " ";
        res = "Name: "+"\n"+name+"\n"+"Description: "+"\n"+description+"\n"+"Code name: "+"\n"+codeName+"\n"+"course id: "+"\n"+id+"\n"
        +"course pre-requisite: "+"\n"+preRequisite+"\n"+"course co-requisite: "+"\n"+CoRequisite;

        return res;

    }
}