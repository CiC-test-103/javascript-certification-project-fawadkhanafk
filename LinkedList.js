// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require('fs/promises');


/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head             // Object
  tail             // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor(  ) {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */

  addStudent(newStudent) {
    // TODO

    let newNode = new Node(newStudent);
    let current;

    if(!this.head){

      this.head = newNode;
      this.tail = newNode;
      
    } else {

      current = this.head;
      while(current.next){
        
        current = current.next;

      }
      current.next = newNode;
      }

      this.length++;   
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */

  removeStudent(email) {
    // TODO

    if(!this.head) 
      return;
  

    if(this.head.data.getEmail() === email) {
      this.head = this.head.next;
      if(!this.head) {
        this.tail = null;
      }
      this.length--;
      return;
    }

    let current = this.head;
    while(current.next) {
      if (current.next.data.getEmail() === email){
        current.next = current.next.next;
      
        if(!current.next){
          this.tail = current;
        }
        this.length--;
        return; 
    }
    
    current = current.next;

    }

  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */


  findStudent(email) {
    // TODO

    let current = this.head;
    while(current){
      
      if(current.data.getEmail() === email) {
        return current.data.getName();
    }
      current = current.next;
    }
    return -1;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO

    let current = this.head;
    let students = []
    while(current) {
      students.push(current.data.getName());
      current = current.next;
    }
    return students.join (", ");
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    const students = [];
    let current = this.head;
    while (current) {
      if(current.data && current.data.getName()){
        students.push(current.data);
      }

      current = current.next;
      
    }
    return students.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */

  filterBySpecialization(specialization) {
    // TODO

   const filteredStudents = [];
   let current = this.head;
   while(current){
    if(current.data && current.data.getSpecialization() === specialization){
      filteredStudents.push(current.data);
    }
    current = current.next;
   }
   
   return filteredStudents.sort((a, b) => a.getName().localeCompare(b.getName()));
    
  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minYear, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO

   const filterdStudents = [];
   let current = this.head;
   while (current){
    if(current.data.getYear() >= minYear){
      filterdStudents.push(current.data)
    }
    current = current.next;
   }
   return this.#sortStudentsByName(filterdStudents);
  
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */

  async saveToJson(fileName) {
    // TODO

    const students = [];
    let current = this.head;
    while (current){
      students.push({
        name: current.data.getName(),
            year: current.data.getYear(),
            email: current.data.getEmail(),
            specialization: current.data.getSpecialization(),

      });
      current = current.next;

    } try {

      await fs.writeFile(fileName, JSON.stringify(students, null, 2));
      console.log(`Adding student... ${fileName}`);
    } catch (error) {
      console.error('Error writing to file:', error)

    }
    
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO

    try { 
      
      const data = await fs.readFile(fileName, 'utf-8');
      const students = JSON.parse(data);
      this.clearStudents();
    
    students.forEach(studentData => {
      this.addStudent(new Student(

        studentData.name,
        studentData.year,
        studentData.email,
        studentData.specialization

      ))});
      console.log(`Loading student... ${fileName}`);

  } catch(error){

    console.error(`Error from JSON: ${error.message}`);

  }

}

}

module.exports = { LinkedList }


//const ll = LinkedList();

