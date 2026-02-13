import { CRUD } from "../CRUD/CRUD.js";
export class ViewPeople extends CRUD {
  view = async () => {
    try {
      let res = await fetch("http://localhost:4000/people");
      let people = await res.json();
      return people;
    } catch (err) {
      console.log("Error : ", err);
    }
  };
}
