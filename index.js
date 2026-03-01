
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  
  import { getFirestore, doc, setDoc,   collection, updateDoc , getDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
  import { getAuth,createUserWithEmailAndPassword ,onAuthStateChanged ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "",
    authDomain: "authentication-69ad6.firebaseapp.com",
    projectId: "authentication-69ad6",
    storageBucket: "authentication-69ad6.firebasestorage.app",
    messagingSenderId: "859586070994",
    appId: "1:859586070994:web:c9c597c5867fba57b7e00b",
    measurementId: "G-34G54LLR69"
  };
AIzaSyDeZiYj_s4sim3Of2ZVlRr0kJa1GeiWgFA
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log(app);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);

//Sign Up 

  const signUpEmail = document.getElementById("semail");
  const signUpPassword = document.getElementById("spassword");
  const signUpButton = document.querySelector("button");

  signUpButton.addEventListener("click", signup);

  function signup() {

    createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
  }


// Sign In

  const signin = document.getElementById("signin");
  const email = document.getElementById("Iemail");
  const password = document.getElementById("Ipassword");
  signin.addEventListener("click", signIn);
  function signIn() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(user.email);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

// Add Data

const addDataButton = document.getElementById("addData");
addDataButton.addEventListener("click", addData);

// Add a new document in collection "cities"
  async function addData() {
    try {
      await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });
      console.log("Data added");
    } catch (error) {
      console.log(error);
      console.log("Not added");
    }
  }

  const updateDataButton = document.getElementById("updateData");
  updateDataButton.addEventListener("click", updateData);

  async function updateData() {

    try{
      const washingtonRef = doc(db, "cities", "LA");

      // Set the "capital" field of the city 'LA' to true
      await updateDoc(washingtonRef, {
        state: "AC"
      });
        console.log("Data updated");
    }
    catch(error){
      console.log(error);
    }
  
  }


//write dat 
  const tempDataButton = document.getElementById("tempData");
  tempDataButton.addEventListener("click", writeCityData);
  async function writeCityData() {
  const citiesRef = collection(db, "cities");

  await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"] });
  await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles", state: "CA", country: "USA",
      capital: false, population: 3900000,
      regions: ["west_coast", "socal"] });
  await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.", state: null, country: "USA",
      capital: true, population: 680000,
      regions: ["east_coast"] });
  await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo", state: null, country: "Japan",
      capital: true, population: 9000000,
      regions: ["kanto", "honshu"] });
  await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing", state: null, country: "China",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"] });
  }
// Get Data
  const getDataButton = document.getElementById("getData");
  getDataButton.addEventListener("click", getData);

  async function getData(){
    const def = doc(db,"cities","DC");
    const docSnap = await getDoc(def);
    if(docSnap.exists()){
      console.log("Document data:", docSnap.data());
    }
    
    else{
      console.log("Document does not exist");
    }
  }