import { CRUD } from "../CRUD/CRUD.js";
export class EditPeople extends CRUD {
  edit = async (peopleId, updatepeople) => {
    try {
      let res = await fetch(`http://localhost:4000/people/${peopleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatepeople),
      });
      if (!res.ok) {
        throw new Error("Failed to update student");
      }
      let upStudent = await res.json();
      return upStudent;
    } catch (err) {
      console.log("Error : ", err);
    }
  };
}
